import { Component ,Input, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthbuttonService } from '../authbutton/authbutton.service';
import { Router } from '@angular/router';


declare var bootstrap:any
@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent implements OnInit{
  @Input() redirectUrl: string = '/loadingpage';
  constructor(private router: Router,public auth: AuthService,public authbuttonservice:AuthbuttonService){}

  ngOnInit(): void {
    const configuration_id=localStorage.getItem("configuration_id")
    
    this.authbuttonservice.getOrderDetails(configuration_id).subscribe(
      (response:any)=>{
        console.log(response)
        const cropped_image_src=response["cropped_image"]
        

        const userimage:any=document.getElementById("user_cropped_image")
        const phonemodel:any=document.getElementById("phone-model")
        const finishtype:any=document.getElementById("finish-type")
        const materialtype:any=document.getElementById("material-type")

        userimage.src=cropped_image_src
        phonemodel.innerHTML=response["phone_model"]
        finishtype.innerHTML=response["case_finish"]
        materialtype.innerHTML=response["case_material"]

        const materialprice=document.getElementById("material-price")
        if (materialtype.innerHTML==="Soft Polycarbonate"){
          if (materialprice)
          materialprice.textContent="$5.00"
        }
        else{
          if (materialprice)
          materialprice.textContent="$0.00"
        }
        const finishprice=document.getElementById("finish-price")
        if (finishtype.innerHTML==="Texture Finish"){
          
          if (finishprice)
          finishprice.textContent="$3.00"
        }
        else{
          if (finishprice)
          finishprice.textContent="$0.00"
        }
        const finalprice=document.getElementById('final-price')
        if (finalprice)
          finalprice.textContent="$"+sessionStorage.getItem("finalPrice")+".00"
        const phone_case:any=document.getElementById("phone-case")
        if (phone_case){
          
          phone_case.style.backgroundColor=response["case_color"]

          
          

        }
        
      },
      (error:any)=>{
        console.log(error)
      }
    )
    
  }
  login():void{
    localStorage.setItem("currentroute",this.router.url)
    this.authbuttonservice.login(this.redirectUrl)
  }

  logout():void{
    this.authbuttonservice.logout()
  }
  isAuthenticated: boolean = false;
  mymodal:any;
  

  signup():void{
    this.auth.loginWithRedirect({
      authorizationParams:{
        screen_hint:"signup",
        prompt:'login',
        redirect_uri:window.location.origin+this.redirectUrl
      },
      appState:{target:this.redirectUrl}
    })
  }
  checkLogin(): void {
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
      
      
      if (this.isAuthenticated) {

        this.handleCheckout()
      } else {
        this.mymodal=new bootstrap.Modal(document.getElementById("mymodal"))
        if (this.mymodal)
        this.mymodal.show()
      }
    });
  }

  handleCheckout() {
    this.authbuttonservice.checkout();
  }
}
