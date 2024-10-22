import { Component,Input} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthbuttonService } from '../authbutton/authbutton.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
  
})
export class HomeComponent{
  @Input() redirectUrl: string = '/loadingpage';
  constructor(public auth: AuthService,public authbuttonservice:AuthbuttonService,public router:Router){}

  login():void{
    
    localStorage.setItem("currentroute",this.router.url)
    this.authbuttonservice.login(this.redirectUrl)
  }
  
  logout():void{
    this.authbuttonservice.logout()
  }

  
}
