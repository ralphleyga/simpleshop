from rest_framework import routers

from .api import (
    BrowseProductsViewSet,
    AddressViewSet,
    OrderViewSet,
    CartView,
    CategoryViewSet,
    CheckoutView,
    )

router = routers.DefaultRouter()
router.register(r'products', BrowseProductsViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'address', AddressViewSet)
router.register(r'orders', OrderViewSet)

router.register(r'cart', CartView, basename='cart')
router.register(r'checkout', CheckoutView, basename='checkout')

urlpatterns = router.urls