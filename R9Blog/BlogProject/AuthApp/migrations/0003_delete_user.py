# Generated by Django 4.2.6 on 2023-12-18 17:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AuthApp', '0002_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]