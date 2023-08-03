import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  [x: string]: any;
  empleados: any[];
  empleadoAEliminar: any;
  mostrarFormularioEliminar = false;

  // Nuevas variables para mostrar los automóviles del empleado
  empleadoSeleccionado: any;
  automovilesDelEmpleado: any[] = [];
  mostrarAutomoviles = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerElementosDesdeAPI();
  }

  obtenerElementosDesdeAPI() {
    this.http.get<any[]>('http://localhost:3000/empleado')
      .subscribe(data => {
        this.empleados = data;
      });
  }

  mostrarFormulario(empleado: any) {
    this.empleadoAEliminar = empleado;
    this.mostrarFormularioEliminar = true;
  }

  cancelarEliminacion() {
    this.empleadoAEliminar = null;
    this.mostrarFormularioEliminar = false;
  }

  eliminarEmpleado() {
    const url = `http://localhost:3000/empleado/${this.empleadoAEliminar._id}`;
    this.http.delete(url).subscribe(() => {
      alert('Empleado eliminado con éxito');
      this.obtenerElementosDesdeAPI();
      this.cancelarEliminacion();
    }, error => {
      console.error('Error al eliminar el empleado:', error);
      this.cancelarEliminacion();
    });
  }

  // Nueva función para obtener los automóviles asociados a un empleado específico y mostrar el modal
  mostrarAutomovilesDelEmpleado(empleadoId: string) {
    this.mostrarAutomoviles = true;
    this.empleadoSeleccionado = this.empleados.find(empleado => empleado._id === empleadoId);
    const url = `http://localhost:3000/auto?trabajador=${empleadoId}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.automovilesDelEmpleado = data.filter(automovil => automovil.trabajador === empleadoId);
      console.log('Automóviles del empleado:', this.automovilesDelEmpleado);
    });
  }

  // Nueva función para cancelar la visualización del modal de automóviles
  cancelarMostrarAutomoviles() {
    this.mostrarAutomoviles = false;
    this.empleadoSeleccionado = null;
    this.automovilesDelEmpleado = [];
  }

  isActive(url: string): boolean {
    return this['router'].url === url;
  }
  
}
