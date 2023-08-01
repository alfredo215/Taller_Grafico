import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroEmpleadosComponent } from './registro-empleados/registro-empleados.component';
import { EmpleadoActualizarComponent } from './empleado-actualizar/empleado-actualizar.component';
import { AutomovilComponent } from './automovil/automovil.component';
import { RegistroAutoComponent } from './registro-auto/registro-auto.component';
import { ActualizarAutoComponent } from './actualizar-auto/actualizar-auto.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: InicioComponent } ,
  { path: 'nuevo-empleado', component: RegistroEmpleadosComponent },
  { path: 'empleado-actualizar/:id', component:EmpleadoActualizarComponent},
  { path: 'automovil', component:AutomovilComponent},
  { path: 'nuevo-auto', component:RegistroAutoComponent},
  { path: 'auto-actualizar/:id', component:ActualizarAutoComponent}

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
