import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-auto',
  templateUrl: './actualizar-auto.component.html',
  styleUrls: ['./actualizar-auto.component.css']
})
export class ActualizarAutoComponent implements OnInit {

  formularioAuto: FormGroup;
  autoId: string;
  empleados: { id: string; nombre: string; }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(params => {
      this.autoId = params['id'];
      if (this.autoId) {
        this.cargarAuto(this.autoId);
      }
    });

    this.obtenerEmpleados(); // Obtener la lista de empleados
  }

  initForm() {
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

  cargarAuto(idAuto: string) {
    const url = `http://localhost:3000/auto/${idAuto}`;
    this.http.get(url).subscribe(data => {
      this.formularioAuto.patchValue(data);
    });
  }

  obtenerEmpleados() {
    const url = 'http://localhost:3000/empleado';
    this.http.get<any[]>(url).subscribe(data => {
      this.empleados = data.map(empleado => ({ id: empleado._id, nombre: empleado.nombre }));
    });
  }

  onSubmit() {
    if (this.formularioAuto.valid) {
      const url = `http://localhost:3000/auto/${this.autoId}`;
      const jsonData = this.formularioAuto.value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.patch(url, jsonData, httpOptions).subscribe(
        (data) => {
          console.log('Respuesta de la API:', data);
          this.router.navigate(['/automovil']);
        },
        (error) => {
          console.error('Error al enviar el formulario:', error);
        }
      );
    }
  }
}
