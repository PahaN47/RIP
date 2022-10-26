# Generated by Django 4.1.2 on 2022-10-23 18:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('price', models.IntegerField()),
                ('rating', models.IntegerField()),
                ('image_url', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Selling',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_id', models.IntegerField()),
                ('status', models.CharField(max_length=16)),
                ('created_date', models.DateField(auto_now=True)),
                ('canceled_date', models.DateField()),
                ('delivered_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='SellingProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField()),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='online_supermarket_api.product')),
                ('selling_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='online_supermarket_api.selling')),
            ],
        ),
    ]
