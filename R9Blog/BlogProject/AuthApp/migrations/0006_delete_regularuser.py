# Generated by Django 4.2.6 on 2023-12-27 19:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AuthApp', '0005_regularuser_is_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RegularUser',
        ),
    ]