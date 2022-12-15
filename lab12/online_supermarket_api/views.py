from datetime import date

from django.http import HttpResponse
from django.shortcuts import render
from online_supermarket_api.models import Product
from online_supermarket_api.models import Selling
from online_supermarket_api.models import SellingProduct
from django.forms.models import model_to_dict

# Create your views here.

def hello(request):
    return render(request, 'index.html', {
        'data': {
            'current_date': date.today(),
            'list': ['Joe Biden', 'his wife', 'his life support system']
        }
    })

order_data = {'data' : {
        'current_date': date.today(),
        'orders': [
            {'title': 'Печеная картошка в фольге в 200г', 'id': 1, 'price': 200, 'rating': 3},
            {'title': 'Масло подсолнечное рафинированое "Золотая семечка"', 'id': 2, 'price': 150, 'rating': 2},
            {'title': 'Сельдерей 50г', 'id': 3, 'price': 100, 'rating': 5},
        ]
    }}


def GetOrders(request):
    sp_obj = SellingProduct.objects.all()
    sps = []
    for item in sp_obj:
        sps.append(model_to_dict(item))
    result = {}
    for i in range(len(sps)):
        result[str(sps[i]['selling'])] = {'count': sps[i]['count'], 'products': []}
    for i in range(len(sps)):
        product = model_to_dict(Product.objects.filter(id=sps[i]['product'])[0])
        result[str(sps[i]['selling'])]['products'].append({ 'count': sps[i]['count'], 'product': product })
    data = []
    for key in result:
        data.append(result[key])
    print(data)
    return render(request, 'orders.html', {'data': {
        'orders': data
    }})

def GetOrder(request, id):
    return render(request, 'order.html', {'data' : {
        'current_date': date.today(),
        'id': id,
        'order': {
            'title': order_data['data']['orders'][id - 1]['title'],
            'price': order_data['data']['orders'][id - 1]['price'],
            'rating': range(order_data['data']['orders'][id - 1]['rating'])
            }
        }})

def GetProductList(request):
    return render(request, 'products.html', { 'data': {
        'products': Product.objects.all()
    }})


def GetProduct(request, id):
    return render(request, 'product.html', { 'data': {
        'product': Product.objects.filter(id=id)[0]
    }})
