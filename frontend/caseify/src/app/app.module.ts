import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ResizableModule } from 'angular-resizable-element';
import { AngularDraggableModule } from 'angular2-draggable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddimageComponent } from './addimage/addimage.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AuthbuttonComponent } from './authbutton/authbutton.component';
import { AuthModule } from '@auth0/auth0-angular';
import {  HttpClientModule } from '@angular/common/http';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { environment } from 'src/environments/environment.development';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddimageComponent,
    OrdersummaryComponent,
    PaymentsuccessComponent,
    NavbarComponent,
    FooterComponent,
    AdmindashboardComponent,
    LoadingpageComponent,
   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ResizableModule,
    FormsModule,
    AngularDraggableModule,
    
    AuthModule.forRoot({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID,
      authorizationParams: {
        
        redirect_uri: window.location.origin,
        federated: true,
        prompt:'login'
      },
      cacheLocation: 'localstorage'
      
    }),
    AuthbuttonComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
