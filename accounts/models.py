import uuid
from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
import datetime

def create_unique_id():
    return str(uuid.uuid4()).replace('-', '')[:8]

#  Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, website=None, update_duration=None, next_update=None, plan=None, approval_required=False, verified=False, price_change_limit=100, temporary_token=None, temporary_token_created_at=None, password=None, password2=None):
        """
        Creates and saves a User with the given email, etc.
        """
        
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
                email=self.normalize_email(email),
                website=website,
                plan=plan,
                approval_required=approval_required,
                update_duration=update_duration,
                next_update=next_update,
                verified=verified,
                price_change_limit=price_change_limit,
                temporary_token=temporary_token,
                temporary_token_created_at=temporary_token_created_at
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, website=None, update_duration=None, next_update=None, plan=None, approval_required=False, verified=False, price_change_limit=100, temporary_token=None, temporary_token_created_at=None, password=None):
        """
        Creates and saves a superuser with the given email, etc.
        """
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            website=website,
            plan=plan,
            approval_required=approval_required,
            update_duration=update_duration,
            next_update=next_update,
            verified=verified,
            price_change_limit=price_change_limit,
            temporary_token=temporary_token,
            temporary_token_created_at=temporary_token_created_at
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

#  Custom User Model
class User(AbstractBaseUser):
    PLAN_CHOICES = [
        ("FREE", "FREE"),
        ("PREMIUM", "PREMIUM"),
        ("PROFESSIONAL", "PROFESSIONAL"),
        ("BUSINESS", "BUSINESS")
    ]

    id = models.CharField(max_length=8, unique=True, primary_key=True, default=create_unique_id, editable=False)
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
        editable=False
    )
    website = models.CharField(max_length=100, null=True, blank=True)
    plan = models.CharField(max_length=30, null=True, blank=True, choices=PLAN_CHOICES)
    update_duration = models.CharField(max_length=30, null=True, blank=True)
    next_update = models.DateTimeField(null=True, blank=True)
    approval_required = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    price_change_limit = models.DecimalField(decimal_places=2, max_digits=10, default=100)
    temporary_token = models.CharField(max_length=36, null=True, blank=True, unique=True)
    temporary_token_created_at = models.DateTimeField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin