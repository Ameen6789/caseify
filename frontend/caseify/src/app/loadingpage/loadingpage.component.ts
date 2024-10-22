import { Component ,OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthbuttonService } from '../authbutton/authbutton.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.css']
})
export class LoadingpageComponent implements OnInit {

  constructor(public auth: AuthService,public authbuttonservice:AuthbuttonService,private http:HttpClient,public router:Router){}

  
  email: string | null = null;
  authId: string | null = null;
  user_id:any;
  ngOnInit(): void {
    // Subscribe to authentication status
    this.http.get('http://127.0.0.1:8000/').subscribe(() => {
    this.authbuttonservice.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Once authenticated, get the user data
        this.authbuttonservice.getUserData().subscribe(user => {
          this.email = user?.email // Ensure user has email
          this.authId = user?.sub  
          if (this.authId && this.email){
            this.authbuttonservice.checkLoggedIn(this.authId!, this.email!).subscribe((response:any) => {
              if (response){
                sessionStorage.setItem("user_id",response["user_id"])
                if (response["user_type"]===true){
                  this.router.navigate(["/admindashboard"])
                  
                }
                else{
                  this.router.navigate([localStorage.getItem("currentroute")])
                  
                }
              }
              // Handle the response here (e.g., redirect, display a message, etc.)
            }, (error:any) => {
              console.error('Error checking login status:', error);
              // Handle error (e.g., show an error message)
            });
          }
          
          // Usually, auth ID is under `sub` in JWTs (Subject ID)
        });
      }
    });
    
  });
}
}
