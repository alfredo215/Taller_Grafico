import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-automovil',
  templateUrl: './automovil.component.html',

})
export class AutomovilComponent implements OnInit {
  autos: any[]; // Declara una variable para almacenar los elementos de la API
  empleados: any[]; // Variable para almacenar los empleados

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerElementosDesdeAPI();
  }

  obtenerElementosDesdeAPI() {
    // Primero, obtén los empleados
    this.http.get<any[]>('http://localhost:3000/empleado')
      .subscribe(empleadosData => {
        this.empleados = empleadosData;

        // Luego, obtén los autos
        this.http.get<any[]>('http://localhost:3000/auto')
          .subscribe(autosData => {
            this.autos = autosData;
            // Asocia el nombre del empleado al auto
            this.autos.forEach(auto => {
              const empleadoAsociado = this.empleados.find(empleado => empleado._id === auto.trabajador);
              auto.nombreEmpleado = empleadoAsociado ? empleadoAsociado.nombre : 'No encontrado';
            });
          });
      });
  }
}
