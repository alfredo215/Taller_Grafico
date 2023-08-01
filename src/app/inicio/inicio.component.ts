import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  empleados: any[]; // Declara una variable para almacenar los elementos de la API

  empleadoAEliminar: any; // Variable para almacenar el empleado que se quiere eliminar

  mostrarFormularioEliminar = false; // Variable para controlar la visualización del formulario de eliminación

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerElementosDesdeAPI();
  }

  obtenerElementosDesdeAPI() {
    this.http.get<any[]>('http://localhost:3000/empleado')
      .subscribe(data => {
        this.empleados = data; // Almacena los datos de la API en la variable "empleados"
      });
  }

  mostrarFormulario(empleado: any) {
    // Muestra el formulario de eliminación y guarda el empleado que se quiere eliminar
    this.empleadoAEliminar = empleado;
    this.mostrarFormularioEliminar = true;
  }

  cancelarEliminacion() {
    // Oculta el formulario de eliminación y limpia la variable de empleado a eliminar
    this.empleadoAEliminar = null;
    this.mostrarFormularioEliminar = false;
  }

  eliminarEmpleado() {
    const url = `http://localhost:3000/empleado/${this.empleadoAEliminar._id}`;
    this.http.delete(url).subscribe(() => {
      // Eliminación exitosa, puedes realizar alguna acción adicional si es necesario
      alert('Empleado eliminado con éxito');
      this.obtenerElementosDesdeAPI(); // Vuelve a cargar la lista de empleados después de eliminar
      this.cancelarEliminacion(); // Cierra el modal de eliminación
    }, error => {
      console.error('Error al eliminar el empleado:', error);
      this.cancelarEliminacion(); // Cierra el modal de eliminación en caso de error
    });
  }
  
}
