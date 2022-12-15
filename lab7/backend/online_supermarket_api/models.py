from django.db import models
from online_supermarket_api.const import SellingStatus
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=16, decimal_places=2)
    rating = models.IntegerField()
    image_url = models.CharField(max_length=255)


class Selling(models.Model):
    customer_id = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=16, default=SellingStatus.PENDING.value, blank=True, null=True)
    created_date = models.DateField(auto_now=True)
    canceled_date = models.DateField(default=None, blank=True, null=True)
    delivered_date = models.DateField(default=None, blank=True, null=True)


class SellingProduct(models.Model):
    selling = models.ForeignKey(Selling, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count = models.IntegerField()


