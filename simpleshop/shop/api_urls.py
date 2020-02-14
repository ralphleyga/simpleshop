from rest_framework import routers

from .api import (
    BrowseProductsViewSet,
    AddressViewSet,
    OrderViewSet,
    CartView,
    )

router = routers.DefaultRouter()
router.register(r'products', BrowseProductsViewSet)
router.register(r'address', AddressViewSet)
router.register(r'orders', OrderViewSet)

router.register(r'cart', CartView, basename='cart')

urlpatterns = router.urls