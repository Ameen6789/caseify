import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService} from '@auth0/auth0-angular';
import { BehaviorSubject,Observable } from 'rxjs';
import { Stripe } from 'stripe-angular';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthbuttonService {

  constructor(public auth:AuthService,private http:HttpClient) {

    this.auth.user$.subscribe(user => {
      this.userDataSubject.next(user); // populate with user data
    });


  }
  

  login(url:any):void{
    
    this.auth.loginWithRedirect({
      authorizationParams:{
        redirect_uri: `${window.location.origin}${url}`

      },
      appState:{target:url}
      
    })
  }


  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: `${window.location.origin}`, // Redirect to your page
        federated: true // Perform federated logout as well
      }
    });
  }

    


  private userDataSubject = new BehaviorSubject<any>(null);
  userData$: Observable<any> = this.userDataSubject.asObservable();

 

  get isAuthenticated$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  getUserData(): Observable<any> {
    return this.userData$; // Returns user data observable
  }


  

  baseUrl = 'http://127.0.0.1:8000/';
  checkLoggedIn(auth0Id:string,email:string):any{
    
    const body = { auth0_id: auth0Id, email: email };
    return this.http.post<any>(`${this.baseUrl}checkloggedin/${auth0Id}/${email}`, body);
  }


  uploadInitialImage(base64img: string, imgwidth: number, imgheight: number): any {
    const body = {
      base64img: base64img,
      imgwidth: imgwidth,
      imgheight: imgheight
    };
    
    return this.http.post<any>(`${this.baseUrl}uploadInitialImage`, body,{
      headers: { 
        
        'Content-Type': 'application/json'},
        withCredentials:true
    });
  }
  getUplodedImageDetails(configuration_id:any):any{
    const body={
      configuration_id:configuration_id
    }
    return this.http.post<any>(`${this.baseUrl}getUploadedImageDetails`,body,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })

  }
  saveConfigration(configuration_id:any,croppedimage:any,casecolor:any,casematerial:any,casefinish:any,phonemodel:any):any{
    const body={
      configuration_id:configuration_id,
      croppedimage:croppedimage,
      casecolor:casecolor,
      casematerial:casematerial,
      casefinish:casefinish,
      phonemodel:phonemodel
    }
    return this.http.post<any>(`${this.baseUrl}saveImageConfiguration`,body,{
      headers:{
        "Content-Type":"application/json"
      }
    })

  }
  getOrderDetails(configuration_id:any):any{
    const body={
      configuration_id:configuration_id
    }
    return this.http.post<any>(`${this.baseUrl}getOrderDetails`,body,{headers:{
      "Content-Type":"applicatiopn/json"
    }})
  }


  private stripe: any;

  createCheckoutSession(configuration_id:any,final_price:any,user_id:any): Promise<{ id: string, order_id: number }> {
    const body={
      configuration_id:configuration_id,
      final_price:final_price,
      user_id:user_id
    }
    return this.http.post<{ id: string, order_id: number }>(`${this.baseUrl}createCheckoutSession`, body,{headers:{
      "Content-Type":"application/json"
    }})
      .toPromise()
      .then(response => {
        if (response && response.id) {
          return response; // return response if valid
        }
        throw new Error('Invalid response from the server'); // handle the case when response is invalid
      });
  }
  

  order_id:any;
  async checkout() {
    this.stripe = (window as { Stripe: Stripe }).Stripe(environment.STRIPE_PUBLIC_KEY); // Replace with your publishable key
    const configuration_id=localStorage.getItem("configuration_id")
    const final_price=sessionStorage.getItem("finalPrice")
    const user_id=sessionStorage.getItem("user_id")
    const sessionResponse:any = await this.createCheckoutSession(configuration_id,final_price,user_id);
    if (sessionResponse){
      
      const result = await this.stripe.redirectToCheckout({ sessionId: sessionResponse.id });
    }
    
  }

  
  


  finalOrderDetails(configuration_id:any):any{
    const body={
      
      configuration_id:configuration_id,
     
    }
    return this.http.post<any>(`${this.baseUrl}finalOrderDetails`,body,{headers:{
      "Content-Type":"application/json"
    }})
  }
  

  
  sendOrderEmail(order_id:any,order_date:any,customer_name:any,customer_email:any,customer_address_street:any,customer_address_postalcode:any,customer_address_state:any):any{
    const body={
      order_id:order_id,
      order_date:order_date,
      customer_name:customer_name,
      customer_email:customer_email,
      customer_address_street:customer_address_street,
      customer_address_postalcode:customer_address_postalcode,
      customer_address_state:customer_address_state
    }
    return this.http.post<any>(`${this.baseUrl}sendOrderEmail`,body,{headers:{
      "Content-Type":"application/json"
    }})
  }



  getallorders():any{
    return this.http.get<any>(`${this.baseUrl}getAllOrders`)
  }
  updateOrderStatus(order_id:any,order_status:any):any{
    const body={
      order_id:order_id,
      order_status:order_status
    }
    return this.http.put<any>(`${this.baseUrl}updateOrderStatus`,body,{headers:{
      "Content-Type":"application/json"
    }})
  }
}

