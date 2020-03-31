from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework import filters

from .mixins import OrderMixin

from .serializers import (
    ProductSerializer,
    AddressSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CartSerializer,
    CategorySerializer,
    CheckoutSerializer
    )
from .models import (
    Product,
    Address,
    Order,
    OrderItem,
    Item,
    Category,
    BAG
    )


class BrowseProductsViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)
    filterset_fields = ['title', 'description']


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_queryset(self, **kwargs):
        return self.queryset.filter(user=self.request.user)


class CartView(OrderMixin, viewsets.ViewSet):

    serializer_class = CartSerializer

    def create(self, request, **kwargs):
        serializer = CartSerializer(request.data)
        item = Item.objects.get(id=request.data.get('item'))
        cart = self.add_to_cart(user=request.user, item=item, quantity=request.data.get('quantity'))
        serializer = OrderSerializer(cart)
        return Response(serializer.data)


class CheckoutView(OrderMixin, viewsets.ViewSet):
    serializer_class = CheckoutSerializer
    
    def create(self, request, **kwargs):
        cart = self.checkout(request.user, **request.data)
        order_serializer = OrderSerializer(cart)
        return Response(order_serializer.data)


class CartUpdateViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()
    
    def get_queryset(self):
        return super().get_queryset().filter(cart__user=self.request.user, cart__status=BAG)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filterset_fields = ['status']

    def get_queryset(self, **kwargs):
        return self.queryset.filter(user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)
