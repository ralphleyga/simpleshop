from .models import (
        Order,
        OrderItem,
        Item,
        BAG
    )

class OrderMixin(object):
    
    def user_cart(self, user):
        """Create user a new cart
        """
        order, c = Order.objects.get_or_create(user=user, status=BAG)
        return order

    def add_to_cart(self, user, item, quantity=1):
        cart = self.user_cart(user)
        try:
            # update item quantity to cart
            order_item = OrderItem.objects.get(item=item.id, cart=cart)
            order_item.quantity = order_item.quantity + int(quantity)
            order_item.save()
        except OrderItem.DoesNotExist:
            # add new item to cart
            order_item = OrderItem()
            order_item.item = item
            order_item.cart = cart
            order_item.quantity = quantity
            order_item.save()
