from django.urls import path
from . import views

urlpatterns = [
    path('view/', view=views.get_account, name='get_account'),
    path('edit/free/', view=views.edit_account_free, name='edit_account_free'),
    path('edit/settings/', view=views.edit_account_settings, name='edit_account_settings'),
    path('register/', view=views.register, name='register'),
    path('reset-password/', view=views.reset_password_email, name='reset_password'),
    path('commit-password/', view=views.commit_password, name='reset_password'),
    path('verify-email/', view=views.verify_email, name='verify_email'),
    path('verify-otp/', view=views.verify_otp, name='verify_otp')
]