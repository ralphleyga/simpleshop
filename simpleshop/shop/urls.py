from django.urls import path

from .views import (
    ProductTemplateView,
    BroweProductsTemplateView,
    AddToCartView,
    CartTemplateView,
    CheckoutTemplateView,
)

urlpatterns = [
    path('all/', BroweProductsTemplateView.as_view(), name='shop_browse_products'),
    path('cart/', CartTemplateView.as_view(), name='cart'),
    path('checkout/', CheckoutTemplateView.as_view(), name='checkout'),

    path('cart/<int:item_id>/', AddToCartView.as_view(), name='shop_add_cart'),
    path('<int:product_id>/', ProductTemplateView.as_view(), name='shop_product_detail'),
]