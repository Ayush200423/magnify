import datetime
from decimal import Decimal
from django.utils import timezone
from api.utils import getProducts
from .models import User as CustomUser
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .utils import activate_products, get_user_products_limit, remove_temp_token, reset_all_latest_orders
from maps.limits_map import PLAN_PRODUCTS_LIMITS
import re

EMAIL_REGEX = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

def validate_passwords_match(password, password2):
    if password != password2:
        raise serializers.ValidationError('Passwords do not match.')
    
def validate_email(email):
    if not re.fullmatch(EMAIL_REGEX, email):
        raise serializers.ValidationError('Please enter a valid email.')
    
def validate_no_email_exists(email):
    user = CustomUser.objects.filter(email=email).first()
    if user:
        raise serializers.ValidationError('User with email already exists.')

    
def validate_token_invalid(associated_user):
    if datetime.datetime.now(datetime.timezone.utc) - associated_user.temporary_token_created_at > datetime.timedelta(minutes = 10):
        remove_temp_token(user=associated_user)
        return True
    return False


class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(style={'input_type':'password'}, write_only=True)
    password = serializers.CharField(style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        password2 = attrs.get('password2')

        validate_passwords_match(password=password, password2=password2)
        validate_password(password=password)
        validate_email(email=email)
        validate_no_email_exists(email=email)

        return attrs
    
    def create(self, validate_data):
        return CustomUser.objects.create_user(**validate_data)
    

class AccountSerializer(serializers.ModelSerializer):
    num_remaining_products = serializers.SerializerMethodField()
    num_max_products = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('website', 'plan', 'email', 'update_duration', 'next_update', 'verified', 'approval_required', 'price_change_limit', 'num_remaining_products', 'num_max_products',)

    def get_product_limits(self, obj):
        request = self.context.get('request', None)
        limit_products = get_user_products_limit(user=request.user)
        total_current_products = len(getProducts(user=request.user))
        return limit_products-total_current_products, limit_products

    def get_num_remaining_products(self, obj):
        total_remaining_products, _ = self.get_product_limits(obj)
        return total_remaining_products
    
    def get_num_max_products(self, obj):
        _, limit_products = self.get_product_limits(obj)
        return limit_products



class EditAccountFreeSerializer(serializers.ModelSerializer):
    update_duration = serializers.CharField(max_length=20)
    website = serializers.CharField(max_length=100, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ('plan', 'update_duration', 'website',)

    def update(self, instance, validated_data):
        instance.plan = "FREE"
        update_duration = validated_data['update_duration']
        if update_duration != getattr(instance, 'update_duration'):
            days, _ = update_duration.split(' ')
            days = int(days)
            duration = datetime.timedelta(days=days)
            result_datetime = timezone.now().date() + duration

            instance.update_duration = update_duration
            instance.next_update = result_datetime
        
        return super().update(instance, validated_data)
    

class EditAccountSettingsSerializer(serializers.ModelSerializer):
    update_duration = serializers.CharField(max_length=20)
    website = serializers.CharField(max_length=100, allow_blank=True)
    approval_required = serializers.BooleanField()
    price_change_limit = serializers.DecimalField(decimal_places=2, max_digits=10)

    class Meta:
        model = CustomUser
        fields = ('update_duration', 'website', 'approval_required', 'price_change_limit')

    def update(self, instance, validated_data):
        update_duration = validated_data['update_duration']
        if update_duration != getattr(instance, 'update_duration'):
            days, _ = update_duration.split(' ')
            days = int(days)
            duration = datetime.timedelta(days=days)
            result_datetime = timezone.now().date() + duration

            instance.update_duration = update_duration
            instance.next_update = result_datetime

            reset_all_latest_orders(user=instance)
            activate_products(user=instance)
        
        return super().update(instance, validated_data)
    
    def validate_price_change_limit(self, data):
        if data < 0 or data > 100:
            raise serializers.ValidationError('Price change limit must be between 0 and 100.')
        else:
            return data


class InitializePasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        email = data.get('email')
        if not email:
            raise serializers.ValidationError('Please provide a valid email')
        elif not CustomUser.objects.filter(email=email).first():
            raise serializers.ValidationError('Email is not associated with an account')
        else:
            return data
            
        
class ResetPasswordSerializer(serializers.Serializer):
    temporary_token = serializers.CharField(max_length=36)
    password = serializers.CharField(max_length=100)
    password2 = serializers.CharField(max_length=100)

    def validate(self, data):
        temporary_token = data.get('temporary_token')
        password = data.get('password')
        password2 = data.get('password2')
        associated_user = CustomUser.objects.filter(temporary_token=temporary_token).first()

        validate_passwords_match(password=password, password2=password2)
        validate_password(password=password)

        if not associated_user:
            raise serializers.ValidationError("We weren't able to find your account.")
        elif validate_token_invalid(associated_user=associated_user):
            raise serializers.ValidationError("This token has expired.")
        else:
            return data
        
class OTPSerializer(serializers.Serializer):
    temporary_token = serializers.CharField(max_length=6)

    def validate(self, data):
        user = self.context.get('user')
        recieved_token = data.get('temporary_token')
        stored_token = user.temporary_token

        if stored_token != recieved_token:
            raise serializers.ValidationError("Tokens do not match.")
        elif validate_token_invalid(associated_user=user):
            raise serializers.ValidationError("This token has expired.")
        else:
            return data