import datetime
import math
from rest_framework.exceptions import ValidationError

from accounts.utils import get_user_products_limit
from .models import Product, Order, ExpectedData

from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page
from django.core.cache import cache

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


def getProducts(user):
    products = user.product_set.all().order_by('created_at')
    return products


def getProduct(user, id):
    return getProducts(user=user).get(id=id)


def deleteProduct(user, id):
    product = getProduct(user=user, id=id)
    product.delete()
    return product


def getOrders(user, id):
    product = getProduct(user=user, id=id)
    if not product:
        raise ValidationError("Product not found.")
    orders = product.order_set.all()
    return orders

def checkProductAddEligibility(user):
    num_products = len(getProducts(user=user))
    limit = get_user_products_limit(user=user)
    return num_products < limit

def getProductActiveEligibility(user):
    next_update = getattr(user, 'next_update')
    update_duration = getattr(user, 'update_duration')
    update_duration_days = int(update_duration.split(' ')[0])
    print((next_update - datetime.datetime.now(next_update.tzinfo)).days)
    print(math.floor(update_duration_days * 0.9))
    return ((next_update - datetime.datetime.now(next_update.tzinfo)).days >= math.floor(update_duration_days * 0.9))

def createProduct(user, data):
    active = getProductActiveEligibility(user=user)
    product = Product(
        name = data['name'],
        max_price = data['max_price'],
        min_price = data['min_price'],
        cost = data['cost'],
        initial = data['initial'],
        owner = user,
        active=active
    )
    product.save()
    return product

def createExpectedData(product):
    expectedData = ExpectedData(
        product = product,
        demand = 0,
        price = getattr(product, 'initial')
    )
    expectedData.save()
    return

# REQUIRES: expected data has to be set before creating order
def createOrder(product):
    expected_data = product.expecteddata
    initialOrder = Order(
        product = product,
        quantity = 0,
        price = expected_data.price
    )
    initialOrder.save()
    return initialOrder

def editCurrentPrice(product):
    expected_data = product.expecteddata
    if (getattr(product, 'min_price') > getattr(expected_data, 'price')):
        expected_data.price = getattr(product, 'min_price')
        expected_data.save()
        return True
    if (getattr(product, 'max_price') < getattr(expected_data, 'price')):
        expected_data.price = getattr(product, 'max_price')
        expected_data.save()
        return True
    return False


def editStagingPrice(product, staging_price):
    if staging_price > 0:
        expected_data = product.expecteddata
        expected_data.staging_price = staging_price
        expected_data.staging_demand = 0
        expected_data.save()
        return True
    return False


def getMostRecentOrder(product):
    orders = product.order_set.all().order_by('-id')
    if not orders:
        order = createOrder(product=product)
    else:
        order = orders[0]
    return order

def editOrders(product):
    order = getMostRecentOrder(product=product)
    expected_data = product.expecteddata
    order.price = expected_data.price
    order.quantity = 0
    order.save()
    return
    
def appendOrder(user, data, id):
    product = getProduct(user=user, id=id)
    if product.active:
        order = getMostRecentOrder(product=product)
        order.quantity += data['quantity']
        order.save()

        return order
    return False

def getProfitStats(user):
    expected_profit = 0
    expected_sold = 0
    expected_revenue = 0
    previous_profit = 0
    previous_sold = 0
    previous_revenue = 0
    most_profit_product = {
        'name': '',
        'profit': 0,
        'id': ''
    }

    products = getProducts(user=user)
    for product in products:
        expected = product.expecteddata

        cost = getattr(product, 'cost')
        demand = getattr(expected, 'demand')
        price = getattr(expected, 'price')

        expected_profit += demand * (price - cost)
        expected_sold += demand
        expected_revenue += demand * price

        # prev order --------->

        all_orders = product.order_set.all().order_by('-id')
        if len(all_orders) > 1:
            previous_order = all_orders[1]

            previous_profit += previous_order.quantity * (previous_order.price - cost)
            previous_sold += previous_order.quantity
            previous_revenue += previous_order.quantity * previous_order.price

            if most_profit_product['profit'] < previous_order.quantity * (previous_order.price - cost):
                if len(product.name) > 25:
                    most_profit_product['name'] = f"{product.name[:24].strip()}..."
                else:
                    most_profit_product['name'] = product.name
                most_profit_product['profit'] = int(previous_order.quantity * (previous_order.price - cost))
                most_profit_product['id'] = product.id

    return expected_profit, expected_sold, expected_revenue, previous_profit, previous_sold, previous_revenue, most_profit_product


def get_from_redis(user):
    return cache.get(str(user.id))

def set_redis_cache(user, data):
    cache.set(str(user.id), data)

def delete_redis_key(user):
    cache.delete(key=str(user.id))