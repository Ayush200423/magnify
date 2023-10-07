from django.contrib import admin
from accounts.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
  # The fields to be used in displaying the User model.
  # These override the definitions on the base UserModelAdmin
  # that reference specific fields on auth.User.
  list_display = ('id', 'email', 'website', 'plan', 'approval_required', 'verified', 'price_change_limit', 'temporary_token', 'temporary_token_created_at', 'update_duration', 'next_update', 'is_admin')
  list_filter = ('is_admin',)
  fieldsets = (
      ('Personal info', {'fields': ('website', 'plan', 'approval_required', 'verified', 'price_change_limit', 'temporary_token', 'temporary_token_created_at', 'update_duration', 'next_update')}),
      ('Permissions', {'fields': ('is_admin',)}),
  )
  # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
  # overrides get_fieldsets to use this attribute when creating a user.
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'website', 'password1', 'password2'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email', 'id')
  filter_horizontal = ()


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)