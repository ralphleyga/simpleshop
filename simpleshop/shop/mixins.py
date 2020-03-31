import uuid

from payments.models import Transaction

from .models import (
        Order,
        OrderItem,
        Item,
        Address,
        BAG,
        PLACED_ORDER
    )

class OrderMixin(object):
    
    def user_cart(self, user):
        """Create user a new cart
        """
        try:
            order, c = Order.objects.get_or_create(user=user, status=BAG)
        except:
            order = Order.objects.filter(user=user, status=BAG).last()
            order.status = PLACED_ORDER
            order.save()
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
        return order_item.cart
    
    def checkout(self, user, address, payment_method):
        order = self.user_cart(user)
        transaction = Transaction()
        transaction.transaction_status = 1
        transaction.transaction_id = str(uuid.uuid1())
        transaction.price = order.total_prices()
        transaction.order = order
        transaction.payment_method = payment_method
        transaction.save()
        order.status = PLACED_ORDER
        order.address = Address.objects.get(id=address)
        order.save()
        # self.user_cart(user)
        return order


class AddressMixin(object):
    def default_address(self, user):
        return Address.objects.get(user=user, default=True)
    
    def set_default_address(self, user, address_id):
        addresses = Address.objects.filter(user=user).update(default=False)
        address = Address.objects.get(user=user, id=address_id)
        address.default = True
        address.save()
        return address

    def get_user_address(self, user):
        return Address.objects.filter(user=user).order_by('-default')