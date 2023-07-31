import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroEmpleadosComponent } from './registro-empleados/registro-empleados.component';
import { EmpleadoActualizarComponent } from './empleado-actualizar/empleado-actualizar.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: InicioComponent } ,
  { path: 'nuevo-empleado', component: RegistroEmpleadosComponent },
  {path: 'empleado-actualizar/:id', component:EmpleadoActualizarComponent}
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
