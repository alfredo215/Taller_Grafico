import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-auto',
  templateUrl: './registro-auto.component.html',
  styleUrls: ['./registro-auto.component.css']
})
export class RegistroAutoComponent implements OnInit {
  formularioAuto: FormGroup;
  empleados: { id: string; nombre: string; }[] = []; // Arreglo para almacenar la lista de empleados con key-value

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
    this.obtenerEmpleados(); // Llama a la función para obtener la lista de empleados
  }

  initForm() {
    // Tu código para inicializar el formulario
    this.formularioAuto = this.formBuilder.group({
      propietario: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', Validators.required],
      matricula: ['', Validators.required],
      diagnostico: ['', Validators.required],
      estado: ['', Validators.required],
      trabajador: ['', Validators.required],
    });
  }

  obtenerEmpleados() {
    const url = 'http://localhost:3000/empleado';

    this.http.get<any[]>(url)
      .subscribe(data => {
        // Almacena los empleados en el arreglo con la estructura key-value
        this.empleados = data.map(empleado => ({ id: empleado._id, nombre: empleado.nombre }));
      });
  }

  onSubmit() {
    if (this.formularioAuto.valid) {
      const url = 'http://localhost:3000/auto';
      const jsonData = this.formularioAuto.value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post(url, jsonData, httpOptions)
        .subscribe(
          (data) => {
            // Manejar la respuesta de la API
            console.log('Respuesta de la API:', data);
            this.formularioAuto.reset(); // Reinicia el formulario para dejar los campos vacíos
          },
          (error) => {
            // Manejar errores
            console.error('Error al enviar el formulario:', error);
          }
        );
    }
  }
}
