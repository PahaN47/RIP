import uuid

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Max, Min
from django.forms import model_to_dict
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status, renderers
from rest_framework.response import Response

from online_supermarket_api import serializers
from online_supermarket_api.middleware import login_exempt, session_storage
from online_supermarket_api.serializers import ProductSerializer, SellingSerializer, SellingProductSerializer
from online_supermarket_api.models import Product, Selling, SellingProduct
from rest_framework.decorators import action, api_view
from online_supermarket_api.const import SellingStatus
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        min_price = self.request.query_params.get('minPrice')
        max_price = self.request.query_params.get('maxPrice')
        name = self.request.query_params.get('name')
        objects = Product.objects.all()
        if min_price:
            objects = objects.filter(price__gte=min_price)
        if max_price:
            objects = objects.filter(price__lte=max_price)
        if name:
            objects = objects.filter(name__icontains=name)
        return objects.order_by('name')

    @action(detail=True, methods=['get'])
    def get_price_range(self, request):
        result = dict();
        result['topPrice'] = Product.objects.aggregate(Max('price'))['price__max']
        result['bottomPrice'] = Product.objects.aggregate(Min('price'))['price__min']
        return Response(result)


class SellingViewSet(viewsets.ModelViewSet):
    queryset = Selling.objects.all().order_by('pk')
    serializer_class = SellingSerializer

    @action(detail=True, methods=['get'])
    def get_cart(self, request, customer_id):
        cart = Selling.objects.get(customer_id=customer_id, status=SellingStatus.PENDING.value)
        return Response(model_to_dict(cart))


class SellingProductViewSet(viewsets.ModelViewSet):
    queryset = SellingProduct.objects.all().order_by('pk')
    serializer_class = SellingProductSerializer

    def get_queryset(self):
        selling_id = self.request.query_params.get('selling_id')
        product_id = self.request.query_params.get('product_id')
        objects = SellingProduct.objects.all()
        if selling_id:
            objects = objects.filter(selling_id=selling_id)
        if product_id:
            objects = objects.filter(product_id=product_id)
        return objects

    @action(detail=True, methods=['post'])
    def add_to_cart(self, request, *args, **kwargs):
        selling_id = request.data.get('cartId')
        product_id = request.data.get('productId')
        count = request.data.get('count')
        try:
            sp = SellingProduct.objects.get(selling_id=selling_id, product_id=product_id)
        except SellingProduct.DoesNotExist:
            sp = None
        if sp:
            sp.count = count if count else sp.count + 1
            sp.save()
        else:
            new_sp = SellingProduct(selling_id=selling_id, product_id=product_id, count=count if count else 1)
            new_sp.save()
        cart_items = list(SellingProduct.objects.filter(selling_id=selling_id).values())
        resp = []
        for item in cart_items:
            resp.append(dict(item))
            resp[-1]['product'] = model_to_dict(Product.objects.get(id=item['product_id']))
            resp[-1].pop('product_id', None)
        return JsonResponse(resp, safe=False)

    @action(detail=True, methods=['get'])
    def get_cart_items(self, request, cart_id):
        cart_items = list(SellingProduct.objects.filter(selling_id=cart_id).values())
        resp = []
        for item in cart_items:
            resp.append(dict(item))
            resp[-1]['product'] = model_to_dict(Product.objects.get(id=item['product_id']))
            resp[-1].pop('product_id', None)
        return JsonResponse(resp, safe=False)

    @action(detail=True, methods=['delete'])
    def delete_from_cart(self, request, sp_id):
        item = SellingProduct.objects.get(id=sp_id)
        cart_id = item.selling_id
        item.delete()
        cart_items = list(SellingProduct.objects.filter(selling_id=cart_id).values())
        resp = []
        for item in cart_items:
            resp.append(dict(item))
            resp[-1]['product'] = model_to_dict(Product.objects.get(id=item['product_id']))
            resp[-1].pop('product_id', None)
        return JsonResponse(resp, safe=False)


@csrf_exempt
@api_view(['post'])
def auth_login(request):
    if not request.COOKIES.get('session_id'):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            new_key = str(uuid.uuid4())
            session_storage.set(new_key, username)
            response_user = {
                'id': user.id,
                'username': user.username,
            }
            response = Response(response_user)
            response.set_cookie('session_id', new_key)
            return response
    return HttpResponse('Invalid credentials or already logged in', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['post'])
def auth_create(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.create_user(username=username, password=password)
    user.save()
    if user:
        new_key = str(uuid.uuid4())
        session_storage.set(new_key, username)
        response_user = {
            'id': user.id,
            'username': user.username,
        }
        response = Response(response_user)
        response.set_cookie('session_id', new_key)
        return response
    return HttpResponse('Can not create user', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['post'])
def auth_logout(request):
    session_id = request.COOKIES.get('session_id')
    if session_id:
        session_storage.delete(session_id)
        response = HttpResponse('ok')
        response.delete_cookie('session_id')
        return response
    return HttpResponse('Unauthorized', status=status.HTTP_500_INTERNAL_SERVER_ERROR)