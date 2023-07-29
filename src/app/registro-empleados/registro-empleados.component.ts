import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.component.html',
  styleUrls: ['./registro-empleados.component.css']
})
export class RegistroEmpleadosComponent implements OnInit {
  
  formEmpleados: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    //FORMULARIO REACTIVO
    this.formEmpleados = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dui: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmit() {
    if (this.formEmpleados.valid) {
      const url = 'http://localhost:3000/empleado'; 
      const jsonData = this.formEmpleados.value;
  
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
            window.location.reload(); // Refrescar la página después de guardar los datos
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
