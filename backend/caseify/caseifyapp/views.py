from django.shortcuts import render
import stripe
from django.conf import settings
import json
from django.views.decorators.csrf import csrf_exempt

from django.http import JsonResponse
from .models import User,ShippingAddress,BillingAddress,Order,Configuration

from django.core.serializers import serialize
from .serializers import OrderSerializer

from django.utils import timezone
from django.db.models import Sum
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
# Create your views here.

def home(request):
    
    return JsonResponse({"message":"Welcome to the Home Page"})

@csrf_exempt
def check_logged_in(request,auth0id,email):
    
    user_details = User.objects.filter(email=email).first()  
    if user_details:
        usertype=user_details.is_superuser
        user_id=user_details.id

    else:
        new_user=User(auth0_id=auth0id,email=email,user_type="customer")
        new_user.save()
        user_id=new_user.id
        usertype=0


    response_data={
        'user_type':usertype,
        "user_id":user_id
    }
    return JsonResponse(response_data)



@csrf_exempt
def upload_initial_image(request):
    if request.method=="POST":
        
        data = json.loads(request.body)
        base64imgdata = data["base64img"]
        imgwidth = data["imgwidth"]
        imgheight = data["imgheight"]
        new_conf=Configuration(image=base64imgdata,width=imgwidth,height=imgheight)
        new_conf.save()

        return JsonResponse({"message": "image uploaded", "configuration_id": new_conf.id})
        
    else:
        return JsonResponse({"message":"image not uploaded"})
    

@csrf_exempt
def get_uploaded_image_details(request):
    if request.method=="POST":
        data=json.loads(request.body)
        config=Configuration.objects.get(id=int(data["configuration_id"]))
        image=config.image
        width=config.width
        height=config.height
        response_data={"image":image,"imagewidth":width,"imageheight":height}
        return JsonResponse(response_data)
        

@csrf_exempt
def save_image_configuration(request):
    
    if request.method=="POST":
        data=json.loads(request.body)
        configuration_id=data["configuration_id"]
        cropped_image=data["croppedimage"]
        case_color=data["casecolor"]
        case_material=data["casematerial"]
        case_finish=data["casefinish"]
        phone_model=data["phonemodel"]
        
        updated_conf=Configuration.objects.get(id=int(configuration_id))
        updated_conf.croppedImage=cropped_image
        updated_conf.color=case_color
        updated_conf.material=case_material
        updated_conf.finish=case_finish
        updated_conf.model=phone_model
        updated_conf.save()
        return JsonResponse({"message":"configuratiion updated"})


@csrf_exempt
def get_order_details(request):
    if request.method=="POST":
        data=json.loads(request.body)
        configuration_id=data["configuration_id"]
        configuration_details=Configuration.objects.get(id=configuration_id)
        cropped_image=configuration_details.croppedImage
        
        case_material=configuration_details.get_material_display()
        case_color=configuration_details.get_color_display()
        case_finish=configuration_details.get_finish_display()
        phone_model=configuration_details.get_model_display()
        response_data={
            "cropped_image":cropped_image,
            "case_color":case_color,
            "case_material":case_material,
            "case_finish":case_finish,
            "phone_model":phone_model
        }
        return JsonResponse(response_data)
    


stripe.api_key = settings.STRIPE_SECRET_KEY  # Set your secret key
@csrf_exempt
def create_checkout_session(request):
    order=Order()
    order.save()
   
    if request.method=="POST" and order.id is not None:

        data=json.loads(request.body)
        domain_url = "http://localhost:4200/"  
        configuration_id=int(data["configuration_id"])
        user_id=int(data["user_id"])
        final_price=int(data["final_price"])
        
        final_price*=100
        conf=Configuration.objects.get(id=configuration_id)
    
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card","link"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": "Custom Iphone Case",
                            
                        },
                        "unit_amount": final_price,  # Amount in cents
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url=domain_url + "paymentsuccess",
            cancel_url=domain_url + "cancel/",
            shipping_address_collection={
                'allowed_countries': ['US', 'CA','IN'],  # Specify allowed countries
            },
            billing_address_collection='required',
            phone_number_collection={'enabled': True},
            metadata={
                'order_id': str(order.id),
                'configuration_id': str(configuration_id),
                'user_id': str(user_id),
                
            }
        )
        
        return JsonResponse({'id': checkout_session.id})


stripe.api_key = settings.STRIPE_SECRET_KEY
@csrf_exempt
def webhook(request):
    payload = request.body
    
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET  # Your webhook secret
    
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        # Invalid payload
        return JsonResponse({'error': str(e)}, status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return JsonResponse({'error': str(e)}, status=400)

    # Handle the event
    if event['type'] == 'checkout.session.completed':

        shippingaddressName=event["data"]["object"]["customer_details"]["name"]
        shippingaddressStreet=event["data"]["object"]["customer_details"]["address"]["line1"]+"  "+event["data"]["object"]["customer_details"]["address"]["line2"]
        shippingaddressCity=event["data"]["object"]["customer_details"]["address"]["city"]
        shippingaddressPostalcode=event["data"]["object"]["customer_details"]["address"]["postal_code"]
        shippingaddressCountry=event["data"]["object"]["customer_details"]["address"]["country"]
        shippingaddressState=event["data"]["object"]["customer_details"]["address"]["state"]
        shippingaddressPhonenumber=event["data"]["object"]["customer_details"]["phone"]

        billingaddressName=event["data"]["object"]["shipping_details"]["name"]
        billingaddressStreet=event["data"]["object"]["shipping_details"]["address"]["line1"]+"  "+event["data"]["object"]["shipping_details"]["address"]["line2"]
        billingaddressCity=event["data"]["object"]["shipping_details"]["address"]["city"]
        billingaddressPostalCode=event["data"]["object"]["shipping_details"]["address"]["postal_code"]
        billingaddressCountry=event["data"]["object"]["shipping_details"]["address"]["country"]
        billingaddressState=event["data"]["object"]["shipping_details"]["address"]["state"]
        billingaddressPhoneNumber=event["data"]["object"]["customer_details"]["phone"]
        

        billing=BillingAddress(name=billingaddressName,street=billingaddressStreet,city=billingaddressCity,postalcode=billingaddressPostalCode,country=billingaddressCountry,state=billingaddressState,phonenumber=billingaddressPhoneNumber)
        billing.save()
        
        shipping=ShippingAddress(name=shippingaddressName,street=shippingaddressStreet,city=shippingaddressCity,postalcode=shippingaddressPostalcode,country=shippingaddressCountry,state=shippingaddressState,phonenumber=shippingaddressPhonenumber)
        shipping.save()
        
        shipping_id=shipping.id
        billing_id=billing.id
        
        session = event['data']['object']
        order_id = session['metadata']['order_id']
        configuration_id = int(session['metadata']['configuration_id'])
        user_id = int(session['metadata']['user_id'])
        final_price = int(event["data"]["object"]["amount_total"])/100
        
        order=Order.objects.get(id=order_id)
        
        order.configuration_id=configuration_id
        order.user_id=user_id
        order.amount=final_price
        order.ispaid=1
        order.status="awaiting_shipment"
        order.shippingaddress_id=shipping_id
        order.billingaddress_id=billing_id
        order.save()

    return JsonResponse({'status': 'success'})



@csrf_exempt
def final_order_details(request):
     
     if request.method=="POST":
        data=json.loads(request.body)
        configuration_id=data["configuration_id"]
        order_details=Order.objects.filter(configuration_id=configuration_id).last()
        

        order_full_details={
            "order_id":order_details.id,
            "customer_email":order_details.user.email,
            "order_date":order_details.createddate,

            "cropped_image":order_details.configuration.croppedImage,
            "case_color":order_details.configuration.color,
            "shipping_address_name":order_details.shippingaddress.name,
            "shipping_address_street":order_details.shippingaddress.street,
            "shipping_address_postalcode":order_details.shippingaddress.postalcode,
            "shipping_address_state":order_details.shippingaddress.state,

            "billing_address_name":order_details.billingaddress.name,
            "billing_address_street":order_details.billingaddress.street,
            "billing_address_postalcode":order_details.billingaddress.postalcode,
            "billing_address_state":order_details.billingaddress.state,
            "amount":order_details.amount
        }

        return JsonResponse({"message":"success","response_data":order_full_details})

@csrf_exempt
def send_order_email(request):
    if request.method=='POST':
        data=json.loads(request.body)
        order_id=data["order_id"]
        order_date=data["order_date"]
        customer_name=data["customer_name"]
        customer_email=data["customer_email"]
        customer_address_street=data["customer_address_street"]
        customer_address_postalcode=data["customer_address_postalcode"]
        customer_address_state=data["customer_address_state"]
        order_date=order_date[0:len(order_date)-1]
        order_date_date=order_date.split("T")
        order_date=order_date_date[0]+" "+order_date_date[1]
    
        if data:
            context={
                "order_id":order_id,
                "customer_name":customer_name,
                "customer_address_street":customer_address_street,
                "customer_address_postalcode":customer_address_postalcode,
                "customer_address_state":customer_address_state,
                "order_date":order_date
            }
            customer_email=customer_email
            convert_to_html_content=render_to_string(template_name='order_confirmation.html',context=context)
            plain_message=strip_tags(convert_to_html_content)
                
            email_message=EmailMultiAlternatives(subject="Caseify Order Confirmation",body=plain_message,  from_email=settings.EMAIL_HOST_USER,to= [customer_email])
            email_message.attach_alternative(convert_to_html_content,"text/html")
            email_message.send()
            context['result'] = 'Email sent successfully'
           
    return JsonResponse({"message":"email_send"}) 


@csrf_exempt
def get_all_orders(request):
    all_order_details = Order.objects.select_related('user', 'billingaddress').all()
    order_serializer=OrderSerializer(all_order_details,many=True)

   
    all_order_details = serialize('json', all_order_details)
    all_order_details = json.loads(all_order_details)
    now=timezone.now()
    current_month_sales=Order.objects.filter(createddate__year=now.year,createddate__month=now.month).aggregate(total_sales=Sum("amount")) 
    
    current_month_sales=current_month_sales["total_sales"]

    start_of_the_week=now - timezone.timedelta(days=now.weekday())
    end_of_the_week=start_of_the_week+timezone.timedelta(days=6)

    current_week_sales=Order.objects.filter(createddate__gte=start_of_the_week,createddate__lte=end_of_the_week).aggregate(total_sales=Sum("amount"))
    current_week_sales=current_week_sales["total_sales"] 
    
    return JsonResponse({"message":"success","all_order_details":order_serializer.data,"monthly_sales":current_month_sales,"weekly_sales":current_week_sales})


@csrf_exempt
def update_order_status(request):
    if request.method=="PUT":
        data=json.loads(request.body)
        
        order_id=data["order_id"]
        order_status=data["order_status"]
        order=Order.objects.get(id=order_id)
        order.status=order_status
        
        order.save()
        return JsonResponse({'status': 'success'})


