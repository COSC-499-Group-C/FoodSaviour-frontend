# Generated by Django 3.1.14 on 2022-12-07 18:30

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Project', '0004_metricdata_wastetype'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='orggroups',
            unique_together={('user', 'group')},
        ),
    ]
