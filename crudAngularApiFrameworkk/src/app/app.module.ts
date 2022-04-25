import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//para la creacion de las rutas
import { AgregarEmpleadoComponent } from './componentes/agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './componentes/editar-empleado/editar-empleado.component';
import { ListarEmpleadoComponent } from './componentes/listar-empleado/listar-empleado.component';

//para los formularios
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//para usar los servicios
import{HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { SubirImagenComponent } from './componentes/subir-imagen/subir-imagen.component';
import { TomarimagenesComponent } from './componentes/tomarimagenes/tomarimagenes.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEmpleadoComponent,
    EditarEmpleadoComponent,
    ListarEmpleadoComponent,
    LoginComponent,
    SubirImagenComponent,
    TomarimagenesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //para poderlos usar en toda la aplicacion
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
