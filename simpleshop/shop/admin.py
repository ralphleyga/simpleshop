from django.contrib import admin

from .models import (
    Product,
    Category,
    Item,
    OrderItem,
    Order,
    Address,
    OrderShippingUpdate,
)

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'price')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'item', 'quantity', 'total_price')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'user')


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')


admin.site.register(OrderShippingUpdate)
