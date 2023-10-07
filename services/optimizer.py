from decimal import Decimal
import math
import os
import sys
import pandas as pd
from sklearn.linear_model import LinearRegression

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

from services.users import get_due_users, get_orders_by_product, update_next_update, get_orders_formatted
from api.utils import createOrder, delete_redis_key, getProducts
from accounts.utils import send_approve_prices_email

class Optimizer:
    def __init__(self, user):
        self.user = user
        self.update_duration_days = int(getattr(self.user, 'update_duration').split(' ')[0])
        self.products = getProducts(user=self.user)


    def normalize_orders(self):
        for product in self.products:
            orders = get_orders_by_product(product=product)
            most_recent_order = orders[0]
            most_recent_quantity = most_recent_order.quantity
            normalized_quantity = float(most_recent_quantity) / float(self.update_duration_days)
            most_recent_order.quantity = normalized_quantity
            most_recent_order.save()


    def optimize_products(self):
        for product in self.products:
            data = get_orders_formatted(product=product)
            if data:
                max_price = int(getattr(product, 'max_price'))
                min_price = int(getattr(product, 'min_price'))
                price_range = abs(max_price - min_price)
                cost = float(getattr(product, 'cost'))
                expected_data = product.expecteddata
                current = float(getattr(expected_data, 'price'))
                price_change_limit = float(getattr(self.user, 'price_change_limit')) / 100
                max_profit = -1
                optimized_price = 0
                optimized_demand = 0

                range_floor = max(min_price, current - (price_range * price_change_limit))
                range_ceiling = min(max_price, current + (price_range * price_change_limit))

                df = pd.DataFrame(data, columns=['prices', 'demands'])
                LR = LinearRegression()
                LR.fit(df[['prices']], df.demands)

                for possible_price in range(math.ceil(range_floor), math.floor(range_ceiling+1)):
                    demand = LR.predict([[possible_price]])
                    profit = possible_price - cost
                    
                    if demand * profit > max_profit:
                        max_profit = demand * profit
                        optimized_price = possible_price
                        optimized_demand = demand

                self.update_expected_data_staging(product=product, optimized_price=optimized_price, optimized_demand=optimized_demand * self.update_duration_days)
                product.active = False
                product.save()
            else:
                self.trial_price_change(product=product)


    def trial_price_change(self, product):
        max_price = int(getattr(product, 'max_price'))
        min_price = int(getattr(product, 'min_price'))
        expected_data = product.expecteddata
        current = int(getattr(expected_data, 'price'))
        new_price_ceiling = current + (current * 0.11)
        new_price_floor = current - (current * 0.11)
        if new_price_ceiling <= max_price:
            self.update_expected_data_staging(product=product, optimized_price=new_price_ceiling, optimized_demand=0)
        elif new_price_floor > min_price:
            self.update_expected_data_staging(product=product, optimized_price=new_price_floor, optimized_demand=0)
        else:
            difference = max_price - min_price
            new_price = current + (difference * 0.5)
            self.update_expected_data_staging(product=product, optimized_price=new_price, optimized_demand=0)
    
    
    def update_expected_data_staging(self, product, optimized_price, optimized_demand):
        expected_data_entry = product.expecteddata
        expected_data_entry.staging_price = Decimal(optimized_price)
        expected_data_entry.staging_demand = int(optimized_demand)
        expected_data_entry.save()


    def migrate_staging_to_active(self):
        for product in self.products:
            expected_data_entry = product.expecteddata
            if expected_data_entry.staging_price != None and expected_data_entry.staging_demand != None:
                expected_data_entry.price = expected_data_entry.staging_price
                expected_data_entry.demand = expected_data_entry.staging_demand
                expected_data_entry.staging_price = None
                expected_data_entry.staging_demand = None
                expected_data_entry.save()

                product.active = True
                product.save()

                createOrder(product=product)
                update_next_update(user=self.user)
                
        delete_redis_key(user=self.user)
        

if __name__ == '__main__':
    users = get_due_users()
    for user in users:
        optimizer = Optimizer(user=user)
        optimizer.normalize_orders()
        optimizer.optimize_products()

        if not user.approval_required:
            optimizer.migrate_staging_to_active()
        else:
            send_approve_prices_email(email=user.email)