import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicio/login.service';
import { persona } from 'src/app/servicio/persona';
import { CookieService } from 'ngx-cookie-service';
import {  Router } from '@angular/router';
import {ServicioMenuService} from 'src/app/servicio/servicio-menu.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formulario:FormGroup
  private per:persona;
  constructor(private builder:FormBuilder,
    private servicioLogin:LoginService,
    private cookie:CookieService,
    private routercito:Router,
    private serviciomenu:ServicioMenuService) { 


    this.formulario=this.builder.group(
      {
        nombre:['',[Validators.required
          //,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
        ]]
      }
    );
    this.per=new persona();
  }

  ngOnInit(): void {
  }
  recibir(){
   
    if(this.formulario.valid){
    //console.log(this.formulario.value.nombre);
     let nombre:string=this.formulario.value.nombre;
      this.per.nombre=nombre;
      this.servicioLogin.Login(this.per).subscribe((res:any=[])=>{
        console.log('respuesta login',res.result,res.menssage,res.data);
        if(res.result==1){
          //bien
          //this.cookie.set('nombreCookie','Algo dinamico, token', 4,'/');
          this.cookie.set('cookieacceso',res.data, 4,'/');
          this.routercito.navigateByUrl("/listar-empleado");
          //comunicar hijo login con padre app
          this.serviciomenu.disparadorMenu.emit(
            {
              data:1
            }
          );
        }else{
          alert("No se encontro el usuario");
        }
      })
    }
    
  }
  public tok:boolean=false;
  public verificar(){
    let cookie=this.cookie.get("cookieacceso");
    if(cookie)
    console.log(cookie); 
    else
    console.log("No existe")
    if(cookie){
    this.servicioLogin.verificarToken(cookie).subscribe((res:any=[])=>{
      if(res.result=="1"){
        this.tok=true;
      }else{
        this.tok=false;
      }
    });
  }else{
    this.tok=false;
  }
  }
}
