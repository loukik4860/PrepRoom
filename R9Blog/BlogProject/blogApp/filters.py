# filters.py
import django_filters
from AuthApp.models import AuthorUser


class AuthorUserFilter(django_filters.FilterSet):
    min_created_at = django_filters.DateFilter(field_name='created_at', lookup_expr='gte')
    max_created_at = django_filters.DateFilter(field_name='created_at', lookup_expr='lte')
    tag = django_filters.CharFilter(field_name='blog_posts__tag__name',lookup_expr='icontains')

    class Meta:
        model = AuthorUser
        fields = ['Author_email', 'Author_firstName', 'Author_lastName', 'tag', 'min_created_at', 'max_created_at']
