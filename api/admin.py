from django.contrib import admin

from .models import Product, Order, ExpectedData, PremiumData

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(ExpectedData)
admin.site.register(PremiumData)