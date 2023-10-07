from accounts.models import User as CustomUser
from api.utils import deleteProduct, getProducts
from magnify import settings
from maps.limits_map import PLAN_PRODUCTS_LIMITS
from .models import StripeCustomer
from django.core.mail import send_mail
from maps.plans_map import PLAN_CHOICES

def createNewStripeCustomer(client, data):
    customer = StripeCustomer(
        user=client,
        stripeCustomerId=data.customer,
        stripeSubscriptionId=data.subscription
    )
    customer.save()

def getUserByEmail(email):
    user = CustomUser.objects.get(email=email)
    return user

def editUserPlan(user, product):
    type = PLAN_CHOICES[product]
    user.plan = type
    user.save()
    return type

def getCustomerByUser(user):
    user = StripeCustomer.objects.filter(user=user).first()
    return user

def deleteMagnifyCustomer(email):
    user = getUserByEmail(email=email)
    magnify_customer = getCustomerByUser(user=user)
    magnify_customer.delete()
    return True

def setUserPlanFree(email):
    user = getUserByEmail(email)
    user.plan = "FREE"
    user.save()
    return user

def sendTrialEndEmail(email):
    subject = "Magnify - Your Trial is Ending"
    message = """
                We hope you have enjoyed using Magnify so far!
                This is just a heads up that your trial is ending soon.
                Please don't hesitate to email magnifyhead@gmail.com if you have any questions - we love to help!
            """
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)
    return True

def removeExcessProducts(user, plan_type):
    limit = PLAN_PRODUCTS_LIMITS[plan_type]
    products = getProducts(user=user)
    for product in products[limit:]:
        deleteProduct(user=user, id=product.id)
    return