import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';

interface Wallpaper {
  id: number,
  wallpaperContent: Uint8Array[];
}


@Component({
  selector: 'app-tomarimagenes',
  templateUrl: './tomarimagenes.component.html',
  styleUrls: ['./tomarimagenes.component.css']
})
export class TomarimagenesComponent implements OnInit {

  image = new Array<string>();
  selectedFile: File[]  |null= null;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }
  

  base64Image: File[]  |null= null;
  ngOnInit(): void {
  }

 


  setSingleImage(wallpaperId: number) {
    const headers = new HttpHeaders();
    this.http.get('https://localhost:44357/api/imagenes/tomarImagen/'+wallpaperId,{headers,  responseType: 'blob'} )
      .subscribe((data: Blob) =>{
       
        const observable = new Observable((subscriber: Subscriber<any>) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = function(){
          subscriber.next(reader.result);
          subscriber.complete();
        }        
      });

      observable.subscribe(d=>{
        this.image[3] = d;
      });      
    });
  }
  
  setImage() {
    this.http.get('https://localhost:44357/api/imagenes/tomarImagenes').subscribe((data: any)  => {
       /*console.log(data[2])
        *data.forEach((wp, index) => {
          this.image[index] = 
          this.sanitizer.sanitize(SecurityContext.NONE, 
            this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + wp.wallpaperContent));
        });  
        */     
    });
  }

}
