import logging
import uuid

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Max, Min
from django.forms import model_to_dict
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status, renderers
from rest_framework.response import Response

from online_supermarket_api.middleware import session_storage
from online_supermarket_api.serializers import ProductSerializer, SellingSerializer, SellingProductSerializer
from online_supermarket_api.models import Product, Selling, SellingProduct
from rest_framework.decorators import action, api_view
from online_supermarket_api.const import SellingStatus


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
    queryset = Selling.objects.none()
    serializer_class = SellingSerializer

    def get_queryset(self):
        session_id = self.request.COOKIES.get('session_id')
        if session_id:
            user_id = session_storage.get(session_id)
            if user_id:
                try:
                    user = User.objects.get(id=user_id)
                except User.DoesNotExist:
                    user = None
                if not user.is_staff:
                    return Selling.objects.filter(customer_id=user_id).order_by('id')
                return Selling.objects.all().order_by('id')
        return Selling.objects.none()

    @action(detail=True, methods=['get'])
    def get_cart(self, request, customer_id):
        cart = Selling.objects.get(customer_id=customer_id, status__in=[SellingStatus.PENDING.value, SellingStatus.PAID.value])
        return Response(model_to_dict(cart))

    @action(detail=True, methods=['get'])
    def get_full_order_list(self, request):
        session_id = self.request.COOKIES.get('session_id')
        if session_id:
            user_id = session_storage.get(session_id)
            if user_id:
                try:
                    user = User.objects.get(id=user_id)
                except User.DoesNotExist:
                    user = None
                if user:
                    if user.is_staff:
                        created_date = self.request.query_params.get('createdDate')
                        selling_status = self.request.query_params.get('status')
                        selling_list = Selling.objects.all().order_by('created_date')

                        if created_date:
                            selling_list = selling_list.filter(created_date=created_date)
                        if selling_status:
                            selling_list = selling_list.filter(status=selling_status)
                        selling_list = list(selling_list.values())
                        sp_list = list(SellingProduct.objects.all().values())
                    else:
                        selling_list = list(Selling.objects.all().filter(customer_id=user_id).order_by('created_date').values())
                        sp_list = list(SellingProduct.objects.all().filter(selling_id__in=[selling['id'] for selling in selling_list]).values())

                    pre_full_order_list = [
                        {**selling, 'products': [
                            {
                                'count': sp['count'],
                                'product': model_to_dict(Product.objects.get(id=sp['product_id']))
                            } if sp else None
                                for sp in [
                                    sp_inner if sp_inner['selling_id'] == selling['id'] else None
                                    for sp_inner in sp_list
                                ]
                            ]
                        }
                        for selling in selling_list
                    ]
                    full_order_list = []
                    for order in pre_full_order_list:
                        full_order_list.append(order)
                        products = []
                        for product in order['products']:
                            if product:
                                products.append(product)
                        full_order_list[-1]['products'] = products
                        full_order_list[-1]['customer_id'] = order['customer_id_id']
                        full_order_list[-1].pop('customer_id_id')

                    return JsonResponse(full_order_list, safe=False)


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


@api_view(['post'])
def auth_login(request):
    session_id = request.COOKIES.get('session_id')
    if session_id:
        user_id = session_storage.get(session_id)

        if user_id:
            user = User.objects.get(id=user_id)
            response_user = {
                'id': user.id,
                'username': user.username,
                'is_staff': user.is_staff
            }
            response = Response(response_user)
            return response
        else:
            response = HttpResponse('Invalid session', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            response.delete_cookie('session_id')
            return response
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        new_key = str(uuid.uuid4())
        session_storage.set(new_key, user.id)
        response_user = {
            'id': user.id,
            'username': user.username,
            'is_staff': user.is_staff
        }
        response = Response(response_user)
        response.set_cookie('session_id', new_key)
        return response
    return HttpResponse('Invalid credentials', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['post'])
def auth_create(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        user = None
    if not user:
        user = User.objects.create_user(username=username, password=password)
        user.save()
        if user:
            new_key = str(uuid.uuid4())
            session_storage.set(new_key, user.id)
            response_user = {
                'id': user.id,
                'username': user.username,
                'is_staff': user.is_staff
            }
            response = Response(response_user)
            response.set_cookie('session_id', new_key)
            return response
    return HttpResponse('Can not create user', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['post'])
def auth_logout(request):
    session_id = request.COOKIES.get('session_id')
    if session_id:
        session_storage.delete(session_id)
        response = HttpResponse('ok')
        response.delete_cookie('session_id')
        return response
    return HttpResponse('Unauthorized', status=status.HTTP_500_INTERNAL_SERVER_ERROR)