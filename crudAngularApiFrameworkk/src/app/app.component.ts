import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { CookieService } from 'ngx-cookie-service';
 
import { LoginService } from 'src/app/servicio/login.service';
import {ServicioMenuService} from 'src/app/servicio/servicio-menu.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProyectoBaseAngular';
  ban:boolean=false;
  constructor(private cookies:CookieService,
    private routercito:Router,
    private servicioLogin:LoginService,
    private serviciomenu:ServicioMenuService){
    if(this.cookies.get("cookieacceso")){
      ban:true;
    }else
      ban:false;
  }
  ngOnInit(){
    //Mostrar menu
    this.serviciomenu.disparadorMenu.subscribe(data=>{
      console.log("datos recibidos",data)
      if(data.data==1){
        if(this.cookies.get("cookieacceso")){
          this.ban=true;
          console.log("menu",data,this.ban)
        }else
          this.ban=false;
      }
    })
  }
  cerrarSesion(){
    console.log(this.cookies.getAll());
    this.cookies.delete("cookieacceso");
    console.log(this.cookies.getAll());
    //Ocultar menu
     
          this.ban=false;
       
     
    this.routercito.navigateByUrl("/login");

  }

}
