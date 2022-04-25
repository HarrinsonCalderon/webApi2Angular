import { Component, OnInit } from '@angular/core';


import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudpersonaService } from 'src/app/servicio/crudpersona.service';
import { persona } from 'src/app/servicio/persona';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {
  public formulario:FormGroup;
  public personaModelo:persona;
  constructor(private builder:FormBuilder,
    private crudservicio:CrudpersonaService,
    private routercito:Router
     ) { 
   /* this.formulario=this.builder.group(
      {
        nombre:[],
        edad:[]
      }
    )
    */
    this.formulario=this.builder.group({
      nombre:['',[Validators.required,Validators.minLength(3)]],
      edad:[]
    });
    this.personaModelo=new persona();
  }

  ngOnInit(): void {
   
  }
    enviarDatos(){
       
      //console.log(this.formulario.value.nombre)
      //console.log(this.formulario.value.edad)
      //console.log(this.formulario.value)
      this.personaModelo.nombre=this.formulario.value.nombre;
      this.personaModelo.edad=this.formulario.value.edad;
      this.crudservicio.guardarPersona(this.personaModelo).subscribe(
        respuesta=>{
          console.log(respuesta);
          if(respuesta!=null){
            alert("se agrego correctamente")
            this.routercito.navigateByUrl("/listar-empleado");
            this.crudservicio.disparador.emit({
              respuesta:"1",
              objeto:respuesta
            }    
            )
          }
        }
      );
    }

}
