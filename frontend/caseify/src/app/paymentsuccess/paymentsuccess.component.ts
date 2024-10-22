import { Component,HostListener,Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthbuttonService } from '../authbutton/authbutton.service';
@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.css']
})
export class PaymentsuccessComponent implements OnInit{
  
  @Input() redirectUrl: string = '/ordersummary';
  constructor(public auth: AuthService,public authbuttonservice:AuthbuttonService){}
  order_full_details:any;
  full_price_post_shipping:any
  ngOnInit(): void {
    const configuration_id=localStorage.getItem("configuration_id")
    
    this.authbuttonservice.finalOrderDetails(configuration_id).subscribe(
      (response:any)=>{
        console.log(response)
        this.order_full_details=response["response_data"]
        this.full_price_post_shipping=3+parseInt(this.order_full_details["amount"])
        
        if (this.order_full_details){
          var order_id:any=this.order_full_details.order_id
          var order_date:any=this.order_full_details.order_date
          var customer_name:any=this.order_full_details.billing_address_name
          var customer_email:any=this.order_full_details.customer_email
          var customer_address_street:any=this.order_full_details.billing_address_street
          var customer_address_postalcode:any=this.order_full_details.billing_address_postalcode
          var customer_address_state:any=this.order_full_details.billing_address_state
      
          
            this.authbuttonservice.sendOrderEmail(order_id,order_date,customer_name,customer_email,
              customer_address_street,customer_address_postalcode,customer_address_state).subscribe(
                (response:any)=>{
                  console.log(response)
                },
                (error:any)=>{
                  console.log(error)
                }
              )
          }
      },
      (error:any)=>{
        console.log(error)
      }
      
    )
    

  }


  login():void{
    this.authbuttonservice.login(this.redirectUrl)
  }

  logout():void{
    this.authbuttonservice.logout()
  }

  // Lifecycle hook called after the view is initialized
  ngAfterViewInit() {
    // Your logic here
    this.UserImageSize();
  }

  UserImageSize() {
    // Implement the logic that needs to run after DOM is loaded
    const finalimage=document.getElementById("final-image")
    if (finalimage){
      setTimeout (() => {

        var finalimageproperties= finalimage.getBoundingClientRect()
        
        var finalimagewidth=finalimageproperties.width
        var finalimageheight=finalimageproperties.height
        var userImage=document.getElementById("case-color")

        if (userImage){
          
          userImage.style.width=finalimagewidth/(3000/637)+3+"px"
          userImage.style.height=finalimagewidth/(3000/637)*2.15+"px"
          
          
          userImage.style.left=(finalimagewidth/2)-(finalimagewidth!/(1216/125))+"px"
          userImage.style.top=(finalimageheight/6.9)+"px"
          
        }
      
      }, 100);
      
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.onResizeUserImage();
  }

  onResizeUserImage() {
    
    const finalimage=document.getElementById("final-image")
    if (finalimage){
      setTimeout (() => {

        var finalimageproperties= finalimage.getBoundingClientRect()
        
        var finalimagewidth=finalimageproperties.width
        var finalimageheight=finalimageproperties.height
        var userImage=document.getElementById("case-color")

        if (userImage){
          userImage.style.width=finalimagewidth/(3000/637)+1+"px"
          userImage.style.height=finalimagewidth/(3000/637)*2.15+"px"
          userImage.style.left=(finalimagewidth/2)-(finalimagewidth!/(1216/125))+"px"
          userImage.style.top=(finalimageheight/6.72)+"px"
          
        }
      
      }, 0);
      
    }
  }
  
  
}
