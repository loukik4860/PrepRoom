from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AuthorUser


# Register your custom user model with the admin site
class AuthorUserAdmin(UserAdmin):
    list_display = (
        'id', 'Author_firstName', 'Author_lastName', 'Author_email', 'is_author', 'is_active', 'is_admin', 'is_regular_user', 'created_at',
        'updated_at')
    list_filter = ('is_admin', 'is_author', 'is_active')
    fieldsets = (
        (None, {'fields': ('Author_email', 'password')}),
        ('Personal Info', {'fields': ('Author_firstName', 'Author_lastName')}),
        ('Permissions', {'fields': ('is_admin', 'is_author', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('Author_email', 'Author_firstName', 'Author_lastName', 'password1', 'password2'),
        }),
    )
    search_fields = ('Author_email', 'Author_firstName', 'Author_lastName')
    ordering = ('Author_email',)
    filter_horizontal = ()


admin.site.register(AuthorUser, AuthorUserAdmin)
