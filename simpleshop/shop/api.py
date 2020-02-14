from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

from .mixins import OrderMixin

from .serializers import (
    ProductSerializer,
    AddressSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CartSerializer
    )
from .models import (
    Product,
    Address,
    Order,
    Item,
    )


class BrowseProductsViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = ['title', 'description']


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_queryset(self, **kwargs):
        return self.queryset.filter(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self, **kwargs):
        return self.queryset.filter(user=self.request.user)


class CartView(OrderMixin, viewsets.ViewSet):

    serializer_class = CartSerializer

    def create(self, request, **kwargs):
        serializer = CartSerializer(request.data)
        item = Item.objects.get(id=request.data.get('item'))
        self.add_to_cart(user=request.user, item=item, quantity=request.data.get('quantity'))
        return Response(serializer.data)
