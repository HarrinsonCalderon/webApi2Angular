import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { persona } from './persona';
import { Observable } from 'rxjs';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudpersonaService {
  host:string="https://localhost:44357/api/";
  @Output()disparador:EventEmitter<any>=new EventEmitter();
  constructor(private http:HttpClient) { 
   
  }

  public listarPersona(){
    return this.http.get(this.host+"personas/Getpersona"); 
  }
  public guardarPersona(per:persona){
    return this.http.post(this.host+"personas/Postpersona",per);
  }
  public eliminarPersona(id:any){
    return this.http.delete(this.host+"personas/Deletepersona/"+id);
  }
  public consultarPersona(id:any){  
    return this.http.get(this.host+"personas/Getpersona/"+id);
  }
  public editarPersona(id:any,per:persona){  
    per.id=id
    return this.http.put(this.host+"personas/Put/"+id,per);
  }
  public cargarPersona(){
    return this.http.get(this.host+"personas/cargarPersona");
  }
}
