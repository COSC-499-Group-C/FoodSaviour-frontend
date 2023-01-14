# Generated by Django 3.1.14 on 2022-11-25 18:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Project', '0003_auto_20221110_0754'),
    ]

    operations = [
        migrations.CreateModel(
            name='WasteType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Waste Type',
            },
        ),
        migrations.CreateModel(
            name='MetricData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField()),
                ('amount', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('waste_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Project.wastetype')),
            ],
            options={
                'verbose_name_plural': 'Metric Form Data',
            },
        ),
    ]
