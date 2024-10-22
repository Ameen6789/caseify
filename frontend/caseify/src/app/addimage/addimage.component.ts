import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthbuttonService } from '../authbutton/authbutton.service';
@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent {
  @Input() redirectUrl: string = '/loadingpage';
  constructor(private router: Router,public auth: AuthService,public authbuttonservice:AuthbuttonService){}
  

  login():void{
    localStorage.setItem("currentroute",this.router.url)
    this.authbuttonservice.login(this.redirectUrl)
  }

  logout():void{
    this.authbuttonservice.logout()
  }

  
  isDragOver = false;
  file: File | null = null;  // Only one file
  progress = 0;  // Initialize the progress to 0
  isReadingFile = false;
  redirecting = false;  // Track whether the file is being read
  filebase64:string=""
  imgwidth:number=0
  imgheight:number=0

  // Handle drag over event
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  // Handle drag leave event
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  // Handle drop event
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      
      const file = event.dataTransfer?.files[0];
      const newimage=new Image()
      newimage.src = URL.createObjectURL(file);
      newimage.onload=function(){
        const width=newimage.width
        const height=newimage.height
        localStorage.setItem("image-width",Math.floor(width).toString())
        localStorage.setItem("image-height",Math.floor(height).toString())
      }
      
      this.imgwidth=parseInt(localStorage.getItem("image-width")!)
      this.imgheight=parseInt(localStorage.getItem("image-height")!)

      if ((file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') && Math.ceil(file.size)<=2097152) {
        const error_container=document.getElementById("error-container")
          if (error_container){
            error_container.style.display="none"
          }

        const fileprogresscontainer=document.getElementById("file-progress-container")
        if (fileprogresscontainer){
          fileprogresscontainer.style.display="block"
        }
        this.convertToBase64(file);
      } else {

        const error_container=document.getElementById("error-container")
        if (error_container){
          error_container.style.display="block"
        }
        
      }

    }
  }


  // Handle file selection from input
  onFileSelected(event: Event) {
    
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const newimage=new Image()
      newimage.src = URL.createObjectURL(file);
      newimage.onload=function(){
        const width=newimage.width
        const height=newimage.height
        localStorage.setItem("image-width",Math.floor(width).toString())
        localStorage.setItem("image-height",Math.floor(height).toString())
      }
      
      this.imgwidth=parseInt(localStorage.getItem("image-width")!)
      this.imgheight=parseInt(localStorage.getItem("image-height")!)

      if ((file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') && Math.ceil(file.size)<=2097152) {
        const error_container=document.getElementById("error-container")
          if (error_container){
            error_container.style.display="none"
          }
        const fileprogresscontainer=document.getElementById("file-progress-container")
        if (fileprogresscontainer){
          fileprogresscontainer.style.display="block"
        }
        this.convertToBase64(file);
      } else {
          const error_container=document.getElementById("error-container")
          if (error_container){
            error_container.style.display="block"
          }
      }
    } 
  }


  

  convertToBase64(file: File) {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      
      // Now you can use the Base64 string in your application
      this.handleBase64Image(base64String);
    };
    
    reader.onerror = (error) => {
      console.error('Error converting file to Base64:', error);
    };
    reader.readAsDataURL(file);  // This will convert the file to a Base64-encoded string
  }


  handleBase64Image(base64String: string) {

    const placeholder_img_instructions =document.getElementById("placeholder-img-instructions")
    if (placeholder_img_instructions){
      placeholder_img_instructions.style.display="none"
    }
    this.filebase64= base64String  // Set the selected file
     this.uploadImage()
  }



  uploadImage():any{
    
    this.authbuttonservice.uploadInitialImage(this.filebase64,this.imgwidth,this.imgheight).subscribe(
      (response:any)=>{
        const fileprogresscontainer=document.getElementById("file-progress-container")
        if (fileprogresscontainer){
          fileprogresscontainer.style.display="none"
        }


        const redirecting_text=document.getElementById("redirecting-text")
        if (redirecting_text){
          redirecting_text.style.display="block"
        }
        

        localStorage.setItem("configuration_id",response["configuration_id"])
        setTimeout(() => {
                this.router.navigate(['/customizedesign']);
              }, 2000);
            
    },
      (error:any)=>{
        console.log(error)
      }
    );
  }

}
