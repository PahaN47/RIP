from django.contrib import admin
from online_supermarket_api import views
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'product', views.ProductViewSet, 'product')
router.register(r'selling', views.SellingViewSet)
router.register(r'selling-product', views.SellingProductViewSet)

get_price_range = views.ProductViewSet.as_view({
    'get': 'get_price_range'
})

add_to_cart = views.SellingProductViewSet.as_view({
    'post': 'add_to_cart'
})

get_cart = views.SellingViewSet.as_view({
    'get': 'get_cart'
})

get_cart_items = views.SellingProductViewSet.as_view({
    'get': 'get_cart_items'
})

delete_from_cart = views.SellingProductViewSet.as_view({
    'delete': 'delete_from_cart'
})

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('product/price-range', get_price_range),
    path('selling-product/add-to-cart', add_to_cart),
    path('selling/get-cart/<int:customer_id>', get_cart),
    path('selling-product/get-cart-items/<int:cart_id>', get_cart_items),
    path('selling-product/delete-from-cart/<int:sp_id>', delete_from_cart)
]