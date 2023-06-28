import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Eleccion } from 'src/app/models/Elecciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-alta',
  templateUrl: './modal-alta.component.html',
  styleUrls: ['./modal-alta.component.css']
})
export class ModalAltaComponent implements OnInit {
  @Input() eleccion: Eleccion | undefined; // Instancia de eleccion o undefined para indicar si es un update
  form!: FormGroup;
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;

  constructor(
    public dialogRef: MatDialogRef<ModalAltaComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { eleccion: Eleccion | undefined }
  ) {

  }

  ngOnInit(): void {
    this.eleccion = this.data.eleccion? this.data.eleccion : undefined;
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required]
    });

    if (this.eleccion) {
      // Si se proporciona un valor para eleccion, actualizar los datos del formulario
      this.form.patchValue({
        nombre: this.eleccion.nombre,
        fecha: this.eleccion.fecha
      });
    }
    //this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 1000); // Esperar 1 segundo (1000 milisegundos) antes de realizar la detección de cambios
  }

  openCalendar(){
    this.changeDetectorRef.detectChanges();
  }
  saveEleccion(): void {
    if (this.form.valid) {
      const { nombre, fecha } = this.form.value;

      if (this.eleccion) {
        // Si hay una instancia de eleccion, se trata de un update
        this.eleccion.nombre = nombre;
        this.eleccion.fecha = fecha;

        this.abmService.update(this.eleccion).subscribe(
          (data: Eleccion) => {
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: JSON.stringify(data)
            });
            this.dialogRef.close({ nombre, fecha });
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: JSON.stringify(error)
            });
            this.dialogRef.close({ nombre, fecha });
          }
        );
      } else {
        // Si no hay una instancia de eleccion, se trata de una creación
        const nuevaEleccion = new Eleccion();
        nuevaEleccion.nombre = nombre;
        nuevaEleccion.fecha = fecha;

        this.abmService.create(nuevaEleccion).subscribe(
          (data: Eleccion) => {
            Swal.fire({
              icon: 'success',
              title: 'Guardado exitoso',
              text: JSON.stringify(data)
            });
            this.dialogRef.close({ nombre, fecha });
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: JSON.stringify(error)
            });
            this.dialogRef.close({ nombre, fecha });
          }
        );
      }
    }
  }

  closeModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.dialogRef.close();
  }
}
