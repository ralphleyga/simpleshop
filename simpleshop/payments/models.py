import uuid

from django.db import models

# Create your models here.
COD = 1
CREDIT_CARD = 2
REMIT = 3

PAYMENT_METHOD = (
    (COD, 'Cash on Delivery'),
    #(CREDIT_CARD, 'Credit Card'),
    (REMIT, 'Remittance')
)

TRANSACTION_STATUS = (
    (1, 'Pending'),
    (2, 'Payment Received'),
    (3, 'Declined'),
)


class Transaction(models.Model):
    transaction_id =  models.CharField(max_length=255, unique=True)
    payment_method = models.IntegerField(choices=PAYMENT_METHOD)
    transaction_status = models.IntegerField(choices=TRANSACTION_STATUS)
    price = models.FloatField()
    order = models.ForeignKey('shop.Order', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
