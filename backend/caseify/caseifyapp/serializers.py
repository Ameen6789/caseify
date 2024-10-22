from .models import Order,BillingAddress,User
from rest_framework import serializers
class BillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=BillingAddress
        fields=["name"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["email"]

class OrderSerializer(serializers.ModelSerializer):
    billingaddress=BillingAddressSerializer(allow_null=True)
    user=UserSerializer(allow_null=True)
    class Meta:
        model=Order
        fields="__all__"