from rest_framework import viewsets
from online_supermarket_api.serializers import ProductSerializer, SellingSerializer, SellingProductSerializer
from online_supermarket_api.models import Product, Selling, SellingProduct


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('pk')
    serializer_class = ProductSerializer


class SellingViewSet(viewsets.ModelViewSet):
    queryset = Selling.objects.all().order_by('pk')
    serializer_class = SellingSerializer


class SellingProductViewSet(viewsets.ModelViewSet):
    queryset = SellingProduct.objects.all().order_by('pk')
    serializer_class = SellingProductSerializer
