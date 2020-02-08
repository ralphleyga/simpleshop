from django.urls import path

from .views import (
    ProductTemplateView,
    BroweProductsTemplateView,
    AddToCartView
)

urlpatterns = [
    path('all/', BroweProductsTemplateView.as_view(), name='shop_browse_products'),
    path('cart/<int:item_id>/', AddToCartView.as_view(), name='shop_add_cart'),
    path('<int:product_id>/', ProductTemplateView.as_view(), name='shop_product_detail'),
]