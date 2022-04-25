import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//importar
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../servicio/login.service';
@Injectable({
  providedIn: 'root'
})

export class VigilanteGuard implements CanActivate {
  constructor(private cookie:CookieService,
    private routercito:Router,
    private servicioLogin:LoginService){
  
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //la magia, logica para las cookies
    const cookie1=this.cookie.check("cookieacceso");
    
    if(!cookie1){
      this.routercito.navigateByUrl("/login");  
    }else{
      const cookie2=this.cookie.get("cookieacceso");
      this.servicioLogin.verificarToken(cookie2).subscribe((res:any=[])=>{
         
        if(res.result==0){
          this.routercito.navigateByUrl("/login");  
        }
      });
      
    }
    return true;
  }
  
}
