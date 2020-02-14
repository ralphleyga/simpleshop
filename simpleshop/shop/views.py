import uuid

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import (
    TemplateView,
    View,
    ListView,
    CreateView,
    UpdateView
    )
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.forms import inlineformset_factory
from asgiref.sync import async_to_sync, sync_to_async

from payments.models import PAYMENT_METHOD, Transaction
from payments.forms import TransactionForm

from .forms import OrderItemForm
from .models import (
            PLACED_ORDER,
            Address,
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


class AddToCartView(LoginRequiredMixin, OrderMixin, View):

    def post(self, request, **kwargs):
        quantity = request.POST.get('quantity', 1)
        item = Item.objects.select_related('product').get(id=kwargs.get('item_id'))
        
        sync_to_async(self.add_to_cart(request.user, item, quantity))

        return HttpResponseRedirect(reverse('shop_product_detail', kwargs={'product_id': item.product.id}))


class CartTemplateView(LoginRequiredMixin, OrderMixin, TemplateView):
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


class CheckoutTemplateView(LoginRequiredMixin, AddressMixin, OrderMixin, TemplateView):
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


class MyOrdersTemplateView(LoginRequiredMixin, TemplateView):

    template_name = 'shop/my_orders.html'

    def get_context_data(self, **kwargs):
        context = {
            'transactions': Transaction.objects.filter(order__user=self.request.user).order_by('-created_at')
        }
        return super().get_context_data(**context)


class OrderDetailTemplateView(LoginRequiredMixin, TemplateView):

    template_name = 'shop/my_order_detail.html'

    def get_context_data(self, **kwargs):
        transaction_id = self.kwargs['transaction_id']
        transaction = Transaction.objects.get(id=transaction_id, order__user=self.request.user)

        context = {
            'transaction': transaction,
        }
        return super().get_context_data(**context)


class AddressListTemplateView(LoginRequiredMixin, ListView):

    template_name = 'shop/address_list.html'

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user).order_by('-default')

    def get_context_data(self, **kwargs):
        context = {
            'object_list': self.get_queryset()
        }
        return super().get_context_data(**context)


class AddressCreateView(AddressMixin, LoginRequiredMixin, CreateView):
    template_name = 'shop/address_form.html'
    model = Address
    fields = ['street_address', 'apartment_address', 'postal_code', 'default']

    def form_valid(self, form):
        """If the form is valid, save the associated model."""
        instance = form.save(commit=False)
        instance.user = self.request.user
        instance.save()

        if instance.default:
            self.set_default_address(self.request.user, instance.id)

        return HttpResponseRedirect(reverse('address_list'))


class AddressUpdateView(AddressMixin, LoginRequiredMixin, UpdateView):
    template_name = 'shop/address_form.html'
    model = Address
    fields = ['street_address', 'apartment_address', 'postal_code', 'default']

    def form_valid(self, form):
        """If the form is valid, save the associated model."""
        instance = form.save(commit=False)
        instance.user = self.request.user
        instance.save()

        if instance.default:
            self.set_default_address(self.request.user, instance.id)

        return HttpResponseRedirect(reverse('address_list'))


class AddressDeleteView(LoginRequiredMixin, View):

    def get(self, request, **kwargs):
        address = Address.objects.get(id=self.kwargs.get('pk'), user=request.user)
        address.delete()
        return HttpResponseRedirect(reverse('address_list'))
