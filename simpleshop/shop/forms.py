from django import forms

from .models import Order, OrderItem


class OrderItemForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        

    class Meta:
        model = OrderItem
        fields = ['item', 'quantity', 'cart']
