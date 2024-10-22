from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
# Create your models here.
class User(AbstractUser):
    user_type=models.CharField(max_length=30)
    auth0_id=models.TextField()

COLOURS=[
    ('black','black'),
    ('blue','blue'),
    ('red','red')
]
IPHONE_MODELS=[
    ("iphonex",'Iphone X'),
    ("iphone11",'Iphone 11'),
    ("iphone12",'Iphone 12'),
    ("iphone13",'Iphone 13'),
    ("iphone14",'Iphone 14'),
    ("iphone15",'Iphone 15'),
    ("iphone16",'Iphone 16'),
    
]

CASE_MATERIAL=[
    ('silicone','Silicone'),
    ('polycarbonate','Soft Polycarbonate'),
]

CASE_FINISH=[
    ('smooth','Smooth Finish'),
    ('textured','Texture Finish'),
]
ORDER_STATUS=[
    ('fulfilled','Fulfilled'),
    ('shipped','Shipped'),
    ('awaiting_shipment','Awaiting Shipment')
]




class Configuration(models.Model):
    width=models.IntegerField()
    height=models.IntegerField()
    image=models.TextField()
    color=models.CharField(choices=COLOURS,blank=True,null=True,max_length=30)
    model=models.CharField(choices=IPHONE_MODELS,blank=True,null=True,max_length=30)
    material=models.CharField(choices=CASE_MATERIAL,blank=True,null=True,max_length=30)
    finish=models.CharField(choices=CASE_FINISH,blank=True,null=True,max_length=30)
    croppedImage=models.TextField(blank=True,null=True)
   
    


class ShippingAddress(models.Model):
    name=models.CharField(max_length=100)
    street=models.CharField(max_length=100)
    city=models.CharField(max_length=100)
    postalcode=models.IntegerField()
    country=models.CharField(max_length=100)
    state=models.CharField(max_length=100)
    phonenumber=models.BigIntegerField()


class BillingAddress(models.Model):
    name=models.CharField(max_length=100)
    street=models.CharField(max_length=100)
    city=models.CharField(max_length=100)
    postalcode=models.IntegerField()
    country=models.CharField(max_length=100)
    state=models.CharField(max_length=100)
    phonenumber=models.BigIntegerField()


class Order(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    configuration=models.ForeignKey(Configuration,on_delete=models.CASCADE,blank=True,null=True,)
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True,)
    amount=models.IntegerField(blank=True,null=True)
    ispaid=models.BooleanField(default=False,blank=True,null=True)
    status=models.CharField(choices=ORDER_STATUS,blank=True,null=True,max_length=30)
    createddate=models.DateTimeField(auto_now_add=True)
    shippingaddress=models.ForeignKey(ShippingAddress,on_delete=models.CASCADE,blank=True,null=True,)
    billingaddress=models.ForeignKey(BillingAddress,on_delete=models.CASCADE,blank=True,null=True,)

    