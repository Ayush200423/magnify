import os
from random import randint
import sys
import uuid
from django.core.mail import send_mail
from django.conf import settings
import datetime

from maps.limits_map import PLAN_PRODUCTS_LIMITS
from .models import User as CustomUser


def prep_reset_password_email(data):
    email = data['email']
    user = CustomUser.objects.get(email=email)
    token = str(uuid.uuid4())
    store_temp_token(user, token)
    send_reset_password_email(email=email, token=token)
    return

def prep_verify_email(user):
    token = randint(100000, 999999)
    email = user.email
    store_temp_token(user, token)
    send_otp_email(email, token)

def verify_user(user):
    user.verified = True
    user.save()
    remove_temp_token(user=user)

def reset_all_latest_orders(user):
    products = user.product_set.all()
    for product in products:
        latest_order = product.order_set.all().order_by('-id')[0]
        latest_order.quantity = 0
        latest_order.save()

def activate_products(user):
    products = user.product_set.all()
    for product in products:
        product.active = True
        product.save()

def change_password(data):
    password = data['password']
    temporary_token = data['temporary_token']
    user = CustomUser.objects.get(temporary_token=temporary_token)
    user.set_password(password)
    remove_temp_token(user=user)
    user.save()

def store_temp_token(user, token):
    user.temporary_token = token
    user.temporary_token_created_at = datetime.datetime.now(datetime.timezone.utc)
    user.save()

def remove_temp_token(user):
    user.temporary_token = None
    user.temporary_token_created_at = None
    user.save()

def send_reset_password_email(email, token):
    subject = "Magnify - Your Password Reset Link"
    message = f'Please click on the link to change your password: http://127.0.0.1:3000/reset-password/{token}/'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)
    return True

def send_otp_email(email, token):
    subject = "Magnify - Your One Time Passcode"
    message = f'Your code is {token}.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)
    return True

def send_approve_prices_email(email):
    subject = "Please Review These Price Changes"
    message = f'You may review the price changes we have recommended by visiting your product dashboard: http://127.0.0.1:3000/products/'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)
    return True

def get_user_products_limit(user):
    user_plan = user.plan
    if user_plan:
        limit = PLAN_PRODUCTS_LIMITS[user_plan]
    else:
        limit = 0
    return limit