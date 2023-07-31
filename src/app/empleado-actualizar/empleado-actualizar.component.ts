import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-empleado-actualizar',
  templateUrl: './empleado-actualizar.component.html',
  styleUrls: ['./empleado-actualizar.component.css']
})
export class EmpleadoActualizarComponent implements OnInit {

  formEmpleados: FormGroup;
  empleadoId: string; // Variable para almacenar el ID del empleado a actualizar

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router // Inyectar Router
  ) { }

  ngOnInit() {
    this.initForm();

    // Obtener el ID del empleado de la URL
    this.route.params.subscribe(params => {
      this.empleadoId = params['id'];
      // Si hay un ID en la URL, cargar los datos del empleado para actualizar el formulario
      if (this.empleadoId) {
        this.cargarEmpleado(this.empleadoId);
      }
    });
  }

  initForm() {
    // FORMULARIO REACTIVO
    this.formEmpleados = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dui: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  cargarEmpleado(idEmpleado: string) {
    const url = `http://localhost:3000/empleado/${idEmpleado}`;
    this.http.get(url).subscribe(data => {
      // Asignar los datos del empleado al formulario
      this.formEmpleados.patchValue(data);
    });
  }

  onSubmit() {
    if (this.formEmpleados.valid) {
      const url = `http://localhost:3000/empleado/${this.empleadoId}`;
      const jsonData = this.formEmpleados.value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      // Utilizar el método HTTP PUT o PATCH para actualizar el empleado
      this.http.patch(url, jsonData, httpOptions).subscribe(
        (data) => {
          // Manejar la respuesta de la API
          console.log('Respuesta de la API:', data);
          // Redireccionar a la página principal después de la actualización exitosa
          this.router.navigate(['/']);
        },
        (error) => {
          // Manejar errores
          console.error('Error al enviar el formulario:', error);
        }
      );
    }
  }

  onTelefonoInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  }

  onDuiInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); // Limitar a 10 dígitos
    }
  }
}
