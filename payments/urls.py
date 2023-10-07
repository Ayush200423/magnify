from django.urls import path
from .views import StripeCheckoutViewPremium, StripeWebhookView, StripeBillingPortalView

urlpatterns = [
    path('create-checkout-session/', StripeCheckoutViewPremium.as_view(), name="checkout_session"),
    path('webhook', StripeWebhookView.as_view(), name="webhook"),
    path('create-portal-session/', StripeBillingPortalView.as_view(), name="billing_portal")
]