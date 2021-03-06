# Generated by Django 3.0 on 2020-03-30 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0010_auto_20200214_0515'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='process_status',
            field=models.IntegerField(blank=True, choices=[(1, 'pending'), (2, 'confirm'), (3, 'packaging'), (4, 'pickup by logistic'), (5, 'shipping'), (6, 'delivered')], null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'Bag'), (2, 'Placed Order'), (3, 'Canceled')]),
        ),
    ]
