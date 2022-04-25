import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioImagenService {
  host:string="https://localhost:44357/api/";
  constructor(private http:HttpClient) { }
  agregarImagen(formulario:any){
    return this.http.post("https://localhost:44357/api/imagenes/guardarImagen",formulario); 
  }
  retornarImagen(){
    //return this.http.get("https://localhost:44357/api/imagenes/tomarImagen"); 
    return this.http.get("https://localhost:44357/api/imagenes/tomarImagenes"); 

  }
  
}
