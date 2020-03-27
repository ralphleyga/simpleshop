from django.urls import path

from .views import (
    ProductTemplateView,
    BroweProductsTemplateView,
    AddToCartView,
    CartTemplateView,
    CheckoutTemplateView,
    OrderDetailTemplateView,
    AddressListTemplateView,
    AddressCreateView,
    AddressUpdateView,
    AddressDeleteView
)

urlpatterns = [
    path('all/', BroweProductsTemplateView.as_view(), name='shop_browse_products'),
    path('cart/', CartTemplateView.as_view(), name='cart'),
    path('checkout/', CheckoutTemplateView.as_view(), name='checkout'),
    path('address/', AddressListTemplateView.as_view(), name='address_list'),
    path('address/create/', AddressCreateView.as_view(), name='address_create'),
    path('address/update/<int:pk>/', AddressUpdateView.as_view(), name='address_update'),
    path('address/delete/<int:pk>/', AddressDeleteView.as_view(), name='address_delete'),

    path('cart/<int:item_id>/', AddToCartView.as_view(), name='shop_add_cart'),
    path('<int:product_id>/', ProductTemplateView.as_view(), name='shop_product_detail'),
]