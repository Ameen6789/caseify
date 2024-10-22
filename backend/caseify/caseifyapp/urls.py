from .views import *
from django.urls import path
urlpatterns=[
    path("checkloggedin/<str:auth0id>/<str:email>",check_logged_in),
    path("",home),
    path("uploadInitialImage",upload_initial_image),
    path("getUploadedImageDetails",get_uploaded_image_details),
    path("saveImageConfiguration",save_image_configuration),
    path("getOrderDetails",get_order_details),
    path('createCheckoutSession', create_checkout_session, name='createCheckoutSession'),
    path('webhook',webhook,name='webhook'),
    path("finalOrderDetails",final_order_details,name="finalOrderDetails"),
    path("getAllOrders",get_all_orders,name="getAllOrders"),
    path("updateOrderStatus",update_order_status,name="updateOrderStatus"),
    path("sendOrderEmail",send_order_email,name="sendOrderEmail"),

]