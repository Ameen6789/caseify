import { Component,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AngularDraggableModule } from 'angular2-draggable';
import { FormsModule } from '@angular/forms';
import { AuthbuttonComponent } from '../authbutton/authbutton.component';
import { AuthService } from '@auth0/auth0-angular';
import { AuthbuttonService } from '../authbutton/authbutton.service';


@Component({
  selector: 'app-customizedesign',
  templateUrl: './customizedesign.component.html',
  styleUrls: ['./customizedesign.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule,AngularDraggableModule,AuthbuttonComponent],
})
export class CustomizedesignComponent implements OnInit {
  
  @Input() redirectUrl: string = '/loadingpage';
  constructor(private router:Router,public auth: AuthService,public authbuttonservice:AuthbuttonService){}

  aspectratio=0
  imagesrc:any=""
  renderedWidth:number=0
  renderedHeight:number=0
  
  renderedPositionX:number=100
  renderedPositionY:number=50
  

  ngOnInit(): void {
    
    const configuration_id=localStorage.getItem("configuration_id")
    this.authbuttonservice.getUplodedImageDetails(configuration_id).subscribe(
      (response:any)=>{
        const cover_page=document.getElementById("cover-page")
          if (cover_page)
          cover_page.style.display="none";
        
        const imagesrc:any=response["image"]
        this.imagesrc=imagesrc
        
        const userimage:any=document.getElementById("user-image")
        const userimagerectangle:any=document.getElementById("user-image-rectangle")
        this.renderedWidth=response["imagewidth"]/4
        this.renderedHeight=response["imageheight"]/4

        if (userimage && userimagerectangle ){

          userimage.src=imagesrc
          userimagerectangle.style.width=(response["imagewidth"]/4)+"px"
          userimagerectangle.style.height=(response["imageheight"]/4)+"px"
          this.aspectratio=(response["imagewidth"]/4)/(response["imageheight"]/4)
          
          
        }
        
      },
      (error:any)=>{
        console.log(error)
        const cover_page=document.getElementById("cover-page")
          if (cover_page)
          cover_page.style.display="none";
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
  

 
  newPosition(event: MouseEvent) {
    console.log('Mouse released at position:', event);
    
    
  }

  onResizeStop(event:any){
    
    this.renderedHeight=event.size.height
    this.renderedWidth=event.size.width
    const element=event.host as HTMLElement
    const parentElement=element.parentElement as HTMLElement

    var elementproperties=element.getBoundingClientRect()
    var parentElementproperties=parentElement.getBoundingClientRect()
    this.renderedPositionY=elementproperties.y-parentElementproperties.y
    this.renderedPositionX=elementproperties.x-parentElementproperties.x

  }



  onMoveEnd(event:any){
    const element=document.getElementById("user-image-rectangle")
    if (element){
      const parentElement=element.parentElement as HTMLElement
      if (parentElement){
        var elementproperties=element.getBoundingClientRect()
        var parentElementproperties=parentElement.getBoundingClientRect()
        this.renderedPositionY=elementproperties.y-parentElementproperties.y
        this.renderedPositionX=elementproperties.x-parentElementproperties.x
      }
    }
    
    
  }
  


  

  selectedColor: string = "rgba(0, 0, 0, 0.896)";
  baseprice: number = 10;
  materialprice: number = 0;  // Store material price here
  finishprice: number = 0;    // Store finish price here
  finalprice:number=10
  
  changeCaseColorandPrice(event: Event, group: string): void {
    
    const inputElement = event.target as HTMLInputElement;

    if (group === "casecolor") {
      const color = inputElement.nextElementSibling;
      if (color) {
        this.selectedColor = window.getComputedStyle(color).backgroundColor;
      }

      
      const caseColor: HTMLElement | null = document.getElementById("case-color");

      if (caseColor) {
        caseColor.style.backgroundColor = this.selectedColor;
      }
    } 

    else if (group === "material-type") {
      this.materialprice = parseInt(inputElement.dataset['price'] || "0");  // Update material price
      

    } 
    else if (group === "finish-type") {
      this.finishprice = parseInt(inputElement.dataset['price'] || "0");  // Update finish price
      
    }

    this.finalprice = this.baseprice + this.materialprice + this.finishprice;
   

    const finalPriceElement = document.getElementById("final-price");
    if (finalPriceElement) {
      finalPriceElement.innerHTML = `${this.finalprice}.00$`;
    }
  }




 
  
  saveConfiguartion(configid:any,croppedimage:any,casecolor:any,casematerial:any,casefinish:any,phonemodel:any){
    this.authbuttonservice.saveConfigration(configid,croppedimage,casecolor,casematerial,casefinish,phonemodel).subscribe(
      (response:any)=>{
        setTimeout(() => {
          this.router.navigate(['/ordersummary']); 
        }, 300);
        
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }




  materialType:string="silicone"
  finishType:string="smooth"
  phoneModel:string="iphonex"
  configuration_id:any=localStorage.getItem("configuration_id")
  onSubmit(){

    // get ref of phonecase
    const phonecaseref=document.getElementById("phone-case")
    var phonecaserefproperties=phonecaseref?.getBoundingClientRect()
    var phonecaseLeft=phonecaserefproperties?.left
    var phonecaseTop=phonecaserefproperties?.top
    var phonecaseWidth=phonecaserefproperties?.width
    var phonecaseHeight=phonecaserefproperties?.height

    // get ref of phonecaseContainer
    const phonecaseContainerRef=document.getElementById("image-customize-container")
    var phonecaseContainerRefproperties=phonecaseContainerRef?.getBoundingClientRect()
    var phonecaseContainerLeft=phonecaseContainerRefproperties?.left
    var phonecaseContainerTop=phonecaseContainerRefproperties?.top

    var offsetLeft=phonecaseLeft!-phonecaseContainerLeft!
    var offsetTop=phonecaseTop!-phonecaseContainerTop!
    
    var actualX=this.renderedPositionX-offsetLeft
    var actualY=this.renderedPositionY-offsetTop



    const canvas=document.createElement("canvas")
    canvas.width=phonecaseWidth!
    canvas.height=phonecaseHeight!
    const ctx=canvas.getContext("2d")

    const usercustomImage=new Image()
    usercustomImage.crossOrigin = "anonymous";
    usercustomImage.src=this.imagesrc

    const loadImage = new Promise((resolve, reject) => {
      usercustomImage.onload = resolve;    // Resolve when the image loads
      usercustomImage.onerror = reject;     // Reject if there's an error loading the image
  });

  loadImage.then(() => {
    ctx?.drawImage(
        usercustomImage,
        actualX,         // Ensure actualX is defined
        actualY,         // Ensure actualY is defined
        this.renderedWidth,  // Ensure this.renderedWidth is defined
        this.renderedHeight  // Ensure this.renderedHeight is defined
    );

    const base64 = canvas.toDataURL(); // Convert canvas to Base64
    
    this.saveConfiguartion(this.configuration_id,base64,this.selectedColor,this.materialType,this.finishType,this.phoneModel)
   
     // Append the new image to the document body
}).catch((error) => {
    console.error("Image failed to load:", error); // Log any errors
});

    sessionStorage.setItem('material', this.materialType);
    sessionStorage.setItem('finish', this.finishType);
    sessionStorage.setItem('phoneModel', this.phoneModel);
    sessionStorage.setItem('caseColor', this.selectedColor);
    sessionStorage.setItem('finalPrice', this.finalprice.toString());
    
  }

}




