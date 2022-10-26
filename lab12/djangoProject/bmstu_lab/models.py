from django.db import models


class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    price = models.IntegerField()  # В копейках
    rating = models.IntegerField()
    image_url = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'product'


class SellingProduct(models.Model):
    id = models.IntegerField(primary_key=True)
    selling_id = models.IntegerField()
    product_id = models.IntegerField()
    count = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'selling_product'


class Selling(models.Model):
    id = models.IntegerField(primary_key=True)
    customer_id = models.IntegerField()
    status = models.CharField(max_length=16, default=None, blank=True, null=True)
    created_date = models.DateField(auto_now=True)
    canceled_date = models.DateField(default=None, blank=True, null=True)
    delivered_date = models.DateField(default=None, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'selling'
