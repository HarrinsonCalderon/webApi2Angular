import { Component, OnInit,SecurityContext  } from '@angular/core';
import { ServicioImagenService } from 'src/app/servicio/servicio-imagen.service';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
interface Wallpaper {
  id: number,
  wallpaperContent: Uint8Array[];
}

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {
    public archivo:any
     
    fileToUpload: File  |null= null;
    imagenes:any=[]
    visualizacion:any;
    previsualizacion:any;
    cargando:boolean=false
    
    imagenes2:any=[]
    image = new Array<string>(4);
  constructor(private servicioImagen:ServicioImagenService,
    private sanitizer: DomSanitizer
     ) {
       this.servicioImagen.retornarImagen().subscribe((res:any=[] )=>{
         this.imagenes=res
        console.log(this.imagenes[1])
         
        for(let i=0;i<this.imagenes.length;i++){
          this.imagenes[i].imagen=this.sanitizer.sanitize(SecurityContext.NONE, 
            this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.imagenes.imagen))
        }
         
       })
        
   }
   public pruebas(){
    console.log(this.imagenes[1].imagen )
    const aux=this.imagenes[1].imagen
     
    this.encriptarEnBase64Imagen(aux)   
   }
  ngOnInit(): void {
      
  }
  subir(){
    const formularioDeDatos=new FormData();
    //imagen es el nombre que me pide la api
     if(this.fileToUpload!=null)
      formularioDeDatos.append("upload",this.fileToUpload);
    //console.log(this.archivo)
    this.servicioImagen.agregarImagen(formularioDeDatos).subscribe(res=>{
     console.log(res)
    })
  }
  capturarArchivo(evento:any){
    this.fileToUpload=<File>evento.target.files[0];
    //Tomar el nombre, osea foto algo.jpg
    //console.log(file.name)
    //console.log(file)
    this.encriptarEnBase64(evento);
    //this.archivos.push(archivoCapturado)
    //console.log(evento.target.files[0])
    
  }
  encriptarEnBase64(event:any){
    const reader=new FileReader();
    if(event.target.files && event.target.files.length>0){
      const file=event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload=()=>{
        this.archivo=reader.result;
         
        //console.log(reader.result)
        this.previsualizacion=reader.result;
      }
    }
  }
  metodo(a:any){
    console.log(a)
  }
  encriptarEnBase64Imagen(imagen:any){
      const reader=new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload=()=>{
        this.visualizacion=reader.result;
      }
    
  }
}
