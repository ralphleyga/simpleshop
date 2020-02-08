from django.views.generic import TemplateView, View
from django.http import HttpResponseRedirect
from django.urls import reverse

from asgiref.sync import async_to_sync, sync_to_async


from .models import Product, Item
from .mixins import OrderMixin

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
