import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-automovil',
  templateUrl: './automovil.component.html',

})
export class AutomovilComponent implements OnInit {
  autos: any[]; // Declara una variable para almacenar los elementos de la API
  empleados: any[]; // Variable para almacenar los empleados

  AutoAEliminar: any; // Variable para almacenar el empleado que se quiere eliminar

  mostrarFormularioEliminar = false; // Variable para controlar la visualización del formulario de eliminación


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

  mostrarFormulario(auto: any) {
    // Muestra el formulario de eliminación y guarda el Auto que se quiere eliminar
    this.AutoAEliminar = auto;
    this.mostrarFormularioEliminar = true;
  }

  cancelarEliminacion() {
    // Oculta el formulario de eliminación y limpia la variable de Auto a eliminar
    this.AutoAEliminar = null;
    this.mostrarFormularioEliminar = false;
  }

  eliminarAuto() {
    const url = `http://localhost:3000/auto/${this.AutoAEliminar._id}`;
    this.http.delete(url).subscribe(() => {
      // Eliminación exitosa, puedes realizar alguna acción adicional si es necesario
      alert('Automovil eliminado con éxito');
      this.obtenerElementosDesdeAPI(); // Vuelve a cargar la lista de empleados después de eliminar
      this.cancelarEliminacion(); // Cierra el modal de eliminación
    }, error => {
      console.error('Error al eliminar el Automovil seleccionado:', error);
      this.cancelarEliminacion(); // Cierra el modal de eliminación en caso de error
    });
  }

}
