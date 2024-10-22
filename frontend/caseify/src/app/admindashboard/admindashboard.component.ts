import { Component, OnInit } from '@angular/core';
import { AuthbuttonService } from '../authbutton/authbutton.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit{
  
  
  constructor(public auth: AuthService,public authbuttonservice:AuthbuttonService){}
  all_orders:any;
  current_week_sales:any;
  current_month_sales:any;
  ngOnInit(): void {
    this.authbuttonservice.getallorders().subscribe(
      (response:any)=>{
        this.all_orders=response["all_order_details"]
        this.current_month_sales=response["monthly_sales"]
        this.current_week_sales=response["weekly_sales"]
        
        const weekly_progress_bar=document.getElementById("weekly-progress-bar")
        if (weekly_progress_bar){
          weekly_progress_bar.style.width=((parseInt(this.current_week_sales)/500)*100).toString()+"%"
          
        }

        const monthly_progress_bar=document.getElementById("monthly-progress-bar")
        if (monthly_progress_bar){
          monthly_progress_bar.style.width=((parseInt(this.current_month_sales)/2000)*100).toString()+"%"
          
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  

  logout():void{
    this.authbuttonservice.logout()
  }

  
  changeOrderStatus(item:any):any{
    var order_id:any=item.id
    var order_status:any=item.status
    this.authbuttonservice.updateOrderStatus(order_id,order_status).subscribe(
      (response:any)=>{
        console.log(response)
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }

}
