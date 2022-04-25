import { Component, OnInit } from '@angular/core';
 
 
import { CrudpersonaService } from 'src/app/servicio/crudpersona.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/servicio/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {
  public lista:any=[];
  public n:any=[1,2,3,4,5,6];
  salidaId:any;
  constructor(private servicio:CrudpersonaService,
    private cookie:CookieService,
    private servicioLogin:LoginService,
    private routercito:Router) { }
  
  ngOnInit(): void {
    if(!this.cookie.get("cookieacceso")){
      this.routercito.navigateByUrl("/login");
    }
    this.listarPersona();
    this.servicio.disparador.subscribe(res=>{
      console.log("respuesta desde agregar",res.respuesta,res.objeto) 
      //recargar listado
      if(res.respuesta==1){
        //se puede hacer esto poco optimo
        //this.listarPersona();
        //se puede hacer esto mas optimo
        this.lista.push(res.objeto);
      }
    }  
    )
 
  }
  listarPersona(){
    /*
    this.servicio.listarPersona().subscribe(
      respuesta=>{
        this.lista=respuesta
        //console.log(respuesta)
      }
    );
    */
    this.servicio.cargarPersona().subscribe(
      respuesta=>{
        this.lista=respuesta
        //console.log(respuesta)
      }
    );
  }
  eliminarPersona(id:any,icontrol:any){
    console.log(id,icontrol);
    if(confirm("Confirmar eliminacion")){
    this.servicio.eliminarPersona(id).subscribe(respuesta=>{
      console.log(respuesta)
      if(respuesta!=null){
        this.lista.splice(icontrol,1);
      }
    });
  }

  }
  ban:boolean=false;
  public verificar(){
    let cookie=this.cookie.get("cookieacceso");
    console.log(cookie); 
    if(cookie){
    this.servicioLogin.verificarToken(cookie).subscribe((res:any=[])=>{
      console.log(res);
      
      if(res.result=="1"){
        this.ban=true;
      }
    });
  }else
  this.ban=false;
  }
}
