import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarEmpleadoComponent } from './componentes/editar-empleado/editar-empleado.component';
import { ListarEmpleadoComponent } from './componentes/listar-empleado/listar-empleado.component';
import { AgregarEmpleadoComponent } from './componentes/agregar-empleado/agregar-empleado.component';
import { LoginComponent } from './componentes/login/login.component';
import { VigilanteGuard } from './vigilantes/vigilante.guard';
import { SubirImagenComponent } from './componentes/subir-imagen/subir-imagen.component';
import { TomarimagenesComponent } from './componentes/tomarimagenes/tomarimagenes.component';
const routes: Routes = [
 {
   path:'',
   component:LoginComponent
 },
 {
  path:'login',
  component:LoginComponent
},
 {
   path:'agregar-empleado',
   component:AgregarEmpleadoComponent
 },
 {
   path:'listar-empleado',
   component:ListarEmpleadoComponent,
   canActivate:[VigilanteGuard]
 },
 {
  path:'editar-empleado/:id',
  component:EditarEmpleadoComponent
 },
 {
   path:'subir-imagen',
   component:SubirImagenComponent
 },
 {
   path:'tomarimagenes',
   component:TomarimagenesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
