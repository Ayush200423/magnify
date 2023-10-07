import sys
import os
import django
from django.contrib.auth import get_user_model
import datetime
from django.utils import timezone

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "magnify.settings")
django.setup()

CustomUser = get_user_model()


def get_due_users():
    users = CustomUser.objects.all()
    date = datetime.datetime.today().date()
    due_users = []

    for user in users:
        if getattr(user, 'next_update').date() == date:
            due_users.append(user)

    return due_users

def get_orders_by_product(product):
    orders = product.order_set.all().order_by('-id')
    return orders

def get_orders_formatted(product):
    orders = get_orders_by_product(product=product)
    orders_formatted = []
    for order in orders:
        order_price = getattr(order, 'price')
        order_quantity = getattr(order, 'quantity')
        orders_formatted.append((float(order_price), int(order_quantity)))
    
    if len(orders_formatted) >= 2:
        return orders_formatted
    else:
        return False

def update_next_update(user):
    update_duration = user.update_duration
    days = int(update_duration.split(' ')[0])
    user.next_update = timezone.now().date() + datetime.timedelta(days=days)
    user.save()