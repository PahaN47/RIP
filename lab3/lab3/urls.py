from django.contrib import admin
from online_supermarket_api import views
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'product', views.ProductViewSet)
router.register(r'selling', views.SellingViewSet)
router.register(r'selling-product', views.SellingProductViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
]