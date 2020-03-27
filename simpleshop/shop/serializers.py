from rest_framework import serializers

from .models import (
    Product,
    Item,
    Address,
    Order,
    OrderItem,
    Category,
    )


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    def get_items(self, instance):
        serializer = ItemSerializer(instance.item_set.all(), many=True)
        return serializer.data

    class Meta:
        model = Product
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='item.title', read_only=True)
    product_id = serializers.IntegerField(source='item.product.id')

    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()

    def get_order_items(self, instance):
        serializer = OrderItemSerializer(instance.orderitem_set.select_related('item').all(), many=True)
        return serializer.data

    class Meta:
        model = Order
        fields = '__all__'


class CartSerializer(serializers.Serializer):
    item = serializers.IntegerField()
    quantity = serializers.IntegerField()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
