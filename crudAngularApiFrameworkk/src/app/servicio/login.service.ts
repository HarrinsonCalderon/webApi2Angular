import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  host:string="https://localhost:44357/api/personas/";
  constructor(private http:HttpClient) { }
  public Login(per:any){
    return this.http.post(this.host+"login",per);
  }

  public verificarToken(tok:any){
    return this.http.get(this.host+"/verificarToken?tok="+tok);
    
  }
}
