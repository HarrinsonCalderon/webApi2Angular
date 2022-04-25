import { Component, OnInit } from '@angular/core';

 import { Router,ActivatedRoute } from '@angular/router';
 import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrudpersonaService } from 'src/app/servicio/crudpersona.service';
import { persona } from 'src/app/servicio/persona';
import { Input } from '@angular/core';
 
@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  elid:any;
  public formulario:FormGroup;
  persona:any;
  public personaModelo:persona;

  @Input() idEntrada:any;
  constructor(private activateRouter:ActivatedRoute,
    private builder:FormBuilder,private http:CrudpersonaService, private routercito:Router
    ) { 
    //tomamos el id de la url
    this.elid=this.activateRouter.snapshot.paramMap.get("id");
    console.log(this.elid);
    //llamamos la persona de la bd
    this.http.consultarPersona(this.elid).subscribe(respuesta=>{
      this.persona=respuesta
      console.log(this.persona.nombre);
      this.formulario.setValue({
        nombre:this.persona.nombre,
        edad:this.persona.edad
      }) 
    });
    //llenamos el formulario
    this.formulario=this.builder.group(
      {
        nombre:[],
        edad:[]
      }
    )
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
    this.personaModelo.id=this.persona.id;
    this.http.editarPersona(this.persona.id,this.personaModelo).subscribe(
      respuesta=>{
        console.log(respuesta);
         
          alert("Se edito correctamente")
          this.routercito.navigateByUrl("/listar-empleado");
       
      }
    );
  }
}
