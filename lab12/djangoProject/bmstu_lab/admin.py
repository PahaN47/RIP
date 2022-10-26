from django.contrib import admin
from .models import Product
from .models import SellingProduct
from .models import Selling

admin.site.register(Product)
admin.site.register(SellingProduct)
admin.site.register(Selling)
