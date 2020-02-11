import uuid

from django.views.generic import TemplateView, View
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.forms import inlineformset_factory
from asgiref.sync import async_to_sync, sync_to_async

from payments.models import PAYMENT_METHOD
from payments.forms import TransactionForm

from .forms import OrderItemForm
from .models import (
            PLACED_ORDER,
            Product,
            Item,
            Order,
            OrderItem)
from .mixins import (
            OrderMixin,
            AddressMixin
            )

class ProductTemplateView(TemplateView):

    template_name = 'shop/product_detail.html'

    def get_context_data(self, **kwargs):
        product = Product.objects.get(id=self.kwargs['product_id'])
        context = {
            'product': product
        }
        return super().get_context_data(**context)


class BroweProductsTemplateView(TemplateView):
    template_name = 'shop/browse_products.html'

    def get_context_data(self, **kwargs):
        products = Product.objects.all().order_by('-created_at')
        context = {
            'products': products
        }
        return super().get_context_data(**context)


class AddToCartView(OrderMixin, View):

    def post(self, request, **kwargs):
        quantity = request.POST.get('quantity', 1)
        item = Item.objects.select_related('product').get(id=kwargs.get('item_id'))
        
        sync_to_async(self.add_to_cart(request.user, item, quantity))

        return HttpResponseRedirect(reverse('shop_product_detail', kwargs={'product_id': item.product.id}))


class CartTemplateView(OrderMixin, TemplateView):
    template_name = 'cart/carts.html'
    formset_class = inlineformset_factory(Order, OrderItem, fields=['quantity', 'item', 'cart'], extra=0)

    def get_context_data(self, *kwargs):
        user_cart = self.user_cart(self.request.user)
        formset = self.formset_class(instance=user_cart)

        context = {
            'user_cart': user_cart,
            'user_cart_form': formset
        }
        return super().get_context_data(**context)

    def post(self, request, **kwargs):
        cart = self.user_cart(self.request.user)
        formset = self.formset_class(request.POST, instance=cart)

        if formset.is_valid():
            formset.save()
        return HttpResponseRedirect(reverse('cart'))


class CheckoutTemplateView(AddressMixin, OrderMixin, TemplateView):
    template_name = 'cart/checkout.html'
    form_class = TransactionForm

    def get_context_data(self, **kwargs):
        form_class = self.form_class()
        form_class.fields['address'].queryset = self.get_user_address(self.request.user)
        context = {
            'payment_methods': PAYMENT_METHOD,
            'user_cart': self.user_cart(self.request.user),
            'addresses': self.get_user_address(self.request.user),
            'payment_form': form_class
        }
        return super().get_context_data(**context)

    def post(self, request, **kwargs):
        form = self.form_class(request.POST)
        context = super().get_context_data(**kwargs)
        order = self.user_cart(self.request.user)

        import pdb; pdb.set_trace()

        if form.is_valid():
            instance = form.save(commit=False)
            instance.transaction_status = 1
            instance.transaction_id = str(uuid.uuid1())
            instance.price = order.total_prices()
            instance.order = order
            instance.save()
            order.status = PLACED_ORDER
            order.address = form.cleaned_data['address']
            order.save()
            return HttpResponseRedirect(reverse('shop_browse_products'))
        return self.render_to_response(request, self.template_name, context.update({
            'payment_form': form
        }))
