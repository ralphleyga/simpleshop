from django import forms

from .models import Order, OrderItem


class OrderItemForm(forms.ModelForm):

    class Meta:
        model = OrderItem
        fields = ['item', 'quantity', 'cart']
