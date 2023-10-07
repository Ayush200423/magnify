from rest_framework import serializers
from .models import Product, Order, ExpectedData

class ProductSerializer(serializers.ModelSerializer):
    current = serializers.DecimalField(source="expecteddata.price", decimal_places=2, max_digits=7)
    staging_price = serializers.DecimalField(source="expecteddata.staging_price", decimal_places=2, max_digits=7)

    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('price','quantity')

class PricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'current',)

class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'max_price', 'min_price', 'cost',)

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('quantity',)

class ExpectedDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpectedData
        fields = ('price',)


class CreateProductSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    max_price = serializers.DecimalField(decimal_places=2, max_digits=7)
    min_price = serializers.DecimalField(decimal_places=2, max_digits=7)
    cost = serializers.DecimalField(decimal_places=2, max_digits=7)
    initial = serializers.DecimalField(decimal_places=2, max_digits=7)

    def validate(self, data):
        cost = data.get('cost')
        min_price = data.get('min_price')
        max_price = data.get('max_price')
        initial = data.get('initial')

        if (min_price <= 0) or (max_price <= 0):
            raise serializers.ValidationError("Minimum and maximum price cannot be less than or equal to zero.")

        if min_price and max_price and min_price > max_price:
            raise serializers.ValidationError("Maximum price should be greater than or equal to the minimum price.")
        
        if cost and min_price and cost > min_price:
            raise serializers.ValidationError("Minimum price should be greater than or equal to the cost.")
        
        if min_price > initial or max_price < initial:
            raise serializers.ValidationError("Initial price should be between the minimum price and maximum price.")

        return data
    
class EditProductSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    max_price = serializers.DecimalField(decimal_places=2, max_digits=7)
    min_price = serializers.DecimalField(decimal_places=2, max_digits=7)
    cost = serializers.DecimalField(decimal_places=2, max_digits=7)
    staging_price = serializers.DecimalField(decimal_places=2, max_digits=7)

    def validate(self, data):
        cost = data.get('cost')
        min_price = data.get('min_price')
        max_price = data.get('max_price')
        staging_price = data.get('staging_price')

        if (min_price <= 0) or (max_price <= 0):
            raise serializers.ValidationError("Minimum and maximum price cannot be less than or equal to zero.")

        if min_price and max_price and min_price > max_price:
            raise serializers.ValidationError("Maximum price should be greater than or equal to the minimum price.")
        
        if cost and min_price and cost > min_price:
            raise serializers.ValidationError("Minimum price should be greater than or equal to the cost.")
        
        if (staging_price != -1):
            if cost and cost > staging_price:
                raise serializers.ValidationError("Suggested price should be greater than or equal to the cost.")
            
            if min_price and max_price and (min_price > staging_price or max_price < staging_price):
                raise serializers.ValidationError("Suggested price should be between the minimum and maximum prices.")

        return data