from rest_framework import serializers

from payments.models import Transaction

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
    full_address = serializers.SerializerMethodField()
    
    def get_full_address(self, instance):
        return instance.full_address()

    class Meta:
        model = Address
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='item.title', read_only=True)
    product_id = serializers.IntegerField(source='item.product.id', read_only=True)
    price = serializers.FloatField(source='item.price', read_only=True)
    total_price = serializers.SerializerMethodField()
    
    def get_total_price(self, instance):
        return instance.total_price

    class Meta:
        model = OrderItem
        fields = '__all__'
        read_only_fields = ('item', 'cart')


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    transaction = serializers.SerializerMethodField()

    def get_total_price(self, instance):
        return instance.total_prices()

    def get_order_items(self, instance):
        serializer = OrderItemSerializer(instance.orderitem_set.select_related('item').all(), many=True)
        return serializer.data
    
    def get_transaction(self, instance):
        transaction = instance.transaction_set.all().first()
        return TransactionSerializer(transaction).data

    class Meta:
        model = Order
        fields = '__all__'


class CartSerializer(serializers.Serializer):
    item = serializers.IntegerField()
    quantity = serializers.IntegerField()


class CheckoutSerializer(serializers.Serializer):
    address = serializers.IntegerField()
    payment_method = serializers.IntegerField()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
