from online_supermarket_api.models import Product, Selling, SellingProduct
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['pk', 'name', 'price', 'rating', 'image_url']


class SellingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selling
        fields = ['pk', 'customer_id', 'status', 'created_date', 'canceled_date', 'delivered_date']


class SellingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingProduct
        fields = ['pk', 'selling_id', 'product_id', 'count']