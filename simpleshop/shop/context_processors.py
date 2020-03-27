from shop.mixins import OrderMixin

def cart(request):
    order_mixin = OrderMixin()
    if request.user.is_authenticated:
        cart = order_mixin.user_cart(request.user)
        return { 'cart': cart.total_items() }
    return {}