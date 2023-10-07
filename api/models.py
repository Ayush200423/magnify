from django.db import models
import uuid
from django.contrib.auth import get_user_model

User = get_user_model()

def create_unique_id():
    return str(uuid.uuid4()).replace('-', '')[:10]

class Product(models.Model):
    id = models.CharField(max_length=10, unique=True, primary_key=True, default=create_unique_id, editable=False)
    name = models.CharField(max_length=100)
    max_price = models.DecimalField(decimal_places=2, max_digits=7)
    min_price = models.DecimalField(decimal_places=2, max_digits=7)
    cost = models.DecimalField(decimal_places=2, max_digits=7)
    initial = models.DecimalField(decimal_places=2, max_digits=7, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.name[:40] + ", " + self.id
    
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.DecimalField(decimal_places=6, max_digits=30)
    price = models.DecimalField(decimal_places=2, max_digits=7)

    def __str__(self):
        return self.product.name[:40] + ", " + str(self.price)

class ExpectedData(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, unique=True)
    demand = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=7)
    staging_demand = models.IntegerField(blank=True, null=True)
    staging_price = models.DecimalField(decimal_places=2, max_digits=7, blank=True, null=True)

    def __str__(self):
        return self.product.name

class PremiumData(models.Model):
    pct_diff_demand = models.DecimalField(decimal_places=2, max_digits=5)
    pct_diff_price = models.DecimalField(decimal_places=2, max_digits=5)