import json
from django.shortcuts import redirect
import stripe
from rest_framework.views import APIView
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import StripeCustomer
from .utils import createNewStripeCustomer, deleteMagnifyCustomer, getUserByEmail, editUserPlan, getCustomerByUser, removeExcessProducts, sendTrialEndEmail, setUserPlanFree

stripe.api_key = settings.STRIPE_SECRET_KEY
webhook_secret = settings.STRIPE_WEBHOOK_KEY

class StripeCheckoutViewPremium(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            user_email = request.user.email
            customer = stripe.Customer.list(email=user_email, limit=1)

            if customer:
                customer_id = customer.data[0].id
            else:
                customer = stripe.Customer.create(email=user_email)
                customer_id = customer.id

            prices = stripe.Price.list(
                lookup_keys=[request.data['lookup_key']],
                expand=['data.product']
            )

            checkout_session = stripe.checkout.Session.create(
                customer = customer_id,
                line_items=[
                    {
                        'price': prices.data[0].id,
                        'quantity': 1,
                    },
                ],
                mode='subscription',
                success_url=settings.SITE_URL + '/account',
                cancel_url=settings.SITE_URL + '/setup-account/?canceled=true',
            )
            return Response(checkout_session.url, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"status": f"server error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class StripeBillingPortalView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            user = request.user
            customer = StripeCustomer.objects.get(user=user)
            return_url = settings.SITE_URL + '/account'

            portalSession = stripe.billing_portal.Session.create(
                customer=getattr(customer, "stripeCustomerId"),
                return_url=return_url,
            )
            return Response(portalSession.url, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status": e}, status=status.HTTP_400_BAD_REQUEST)



class StripeWebhookView(APIView):
    def post(self, request):
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        event = None
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError as e:
            return Response(e, status=400)
        except stripe.error.SignatureVerificationError as e:
            return Response(e, status=400)



        if event['type'] == 'checkout.session.completed':
            data = event.data.object
            client = getUserByEmail(email=data.customer_details.email)
            if not (StripeCustomer.objects.filter(user=client)):
                createNewStripeCustomer(client=client, data=data)


        elif event['type'] == 'customer.subscription.trial_will_end':
            data = event.data.object
            customer = stripe.Customer.retrieve(data.customer)
            sendTrialEndEmail(email=customer.email)
            

        elif event['type'] == 'customer.subscription.created':
            data = event.data.object
            customer = stripe.Customer.retrieve(data.customer)
            user = getUserByEmail(email=customer.email)
            if user.plan == None or user.plan == 'FREE':
                editUserPlan(user=user, product=data.plan.product)


        elif event['type'] == 'customer.subscription.updated':
            data = event.data.object
            customer = stripe.Customer.retrieve(data.customer)
            user = getUserByEmail(email=customer.email)
            type = editUserPlan(user=user, product=data.plan.product)
            removeExcessProducts(user=user, plan_type=type)

        
        elif event['type'] == 'customer.deleted' or event['type'] == 'customer.subscription.deleted':
            data = event.data.object
            customer = stripe.Customer.retrieve(data.customer)
            deleteMagnifyCustomer(email=customer.email)
            user = setUserPlanFree(email=customer.email)
            removeExcessProducts(user=user, plan_type="FREE")

        return Response({'status': 'success'}, status=status.HTTP_200_OK)