import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddimageComponent } from './addimage/addimage.component';
import { CustomizedesignComponent } from './customizedesign/customizedesign.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AuthbuttonComponent } from './authbutton/authbutton.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"addimage",component:AddimageComponent},
  {path:"customizedesign",component:CustomizedesignComponent},
  {path:"ordersummary",component:OrdersummaryComponent},
  {path:"paymentsuccess",component:PaymentsuccessComponent},
  {path:"admindashboard",component:AdmindashboardComponent},
  
  {path:"authbutton",component:AuthbuttonComponent},
  {path:"loadingpage",component:LoadingpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
