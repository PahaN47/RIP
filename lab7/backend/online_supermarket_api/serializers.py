from online_supermarket_api.models import Product, Selling, SellingProduct
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'rating', 'image_url']


class SellingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selling
        fields = ['id', 'customer_id', 'status', 'created_date', 'canceled_date', 'delivered_date']


class SellingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingProduct
        fields = ['id', 'selling_id', 'product_id', 'count']