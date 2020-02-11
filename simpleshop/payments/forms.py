from django import forms

from shop.models import Address
from .models import Transaction


class TransactionForm(forms.ModelForm):
    address = forms.ModelChoiceField(queryset=Address.objects.all())

    class Meta:
        model = Transaction
        fields = ['payment_method']