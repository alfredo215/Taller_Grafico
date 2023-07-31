import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroEmpleadosComponent } from './registro-empleados/registro-empleados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmpleadoActualizarComponent } from './empleado-actualizar/empleado-actualizar.component';
import { AutomovilComponent } from './automovil/automovil.component';
import { RegistroAutoComponent } from './registro-auto/registro-auto.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    RegistroEmpleadosComponent,

    EmpleadoActualizarComponent,
     AutomovilComponent,
     RegistroAutoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
