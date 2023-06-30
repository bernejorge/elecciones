import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Eleccion } from 'src/app/models/Elecciones';
import Swal from 'sweetalert2';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FunctionCall } from 'src/app/models/FunctionInterface';
import { FunctionCallingService } from 'src/app/Shared/services/functionCalling.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-modal-alta',
  templateUrl: './modal-alta.component.html',
  styleUrls: ['./modal-alta.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class ModalAltaComponent implements OnInit, OnDestroy {
  @Input() eleccion: Eleccion | undefined; // Instancia de eleccion o undefined para indicar si es un update
  form!: FormGroup;
  @ViewChild('picker') datePicker!: MatDatepicker<any>;
  private funciones: FunctionCall[] = [];
  private subscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ModalAltaComponent>,
    private formBuilder: FormBuilder,
    private abmService: CrudService,
    private funtionCallService: FunctionCallingService,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: { eleccion: Eleccion | undefined }
  ) {

    this.funciones.push(
      {
        name: 'guardar',
        description: 'Save or update the current intance of Eleccion in database and close the dialog.',
        parameters: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'cancelar_Cerrar',
        description: 'Cancel or abort the save or update action and close the dialog',
        parameters: {
          type: 'object',
          properties: {}
        }
      }
    );

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.funtionCallService.removeFunctions(this.funciones);
  }

  ngOnInit(): void {
    this.funtionCallService.addFunctions(this.funciones);
    this.subscription = this.funtionCallService.functionReturned$
      .subscribe({
        next: (data: string) => {
          // logica para llamar a las funcion devuelta por el servicio
          this.zone.run(() => {
            if (data.length > 0 && data.includes("name")) {
              const responseObject = JSON.parse(data);
              switch (responseObject.name.trim()) {
                case "guardar":
                  this.saveEleccion();
                  break;
                case "cancelar_Cerrar":
                  this.closeModal();
                  break;
                default:
                  break;
              }
            }

          });

        },
        error: (error) => {
          console.log(error);
        }
      });
    this.eleccion = this.data.eleccion ? this.data.eleccion : undefined;
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

  }


  saveEleccion(): void {
    if (this.form.valid) {
      const { nombre, fecha } = this.form.value;

      if (this.eleccion && this.eleccion.id && this.eleccion.id > 0) {
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

  closeModal(event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();
    this.dialogRef.close();
  }
}
