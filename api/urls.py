from django.urls import path
from . import views
from .views import CustomTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('products/', views.products, name='products'),
    path('products/<str:id>/', views.modifyProducts, name='products'),
    
    path('orders/<str:id>/', views.orders, name='orders'),

    path('statistics/', views.statistics, name='statistics'),

    path('prices/', views.prices, name='prices'),
    path('prices/approve/', views.pricesActivate, name='activate_prices'),

    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]