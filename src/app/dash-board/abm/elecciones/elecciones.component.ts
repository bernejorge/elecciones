import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Eleccion } from 'src/app/models/Elecciones';
import { ModalAltaComponent } from './modal-alta/modal-alta.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { FunctionCallingService } from 'src/app/Shared/services/functionCalling.service';
import { FunctionCall } from 'src/app/models/FunctionInterface';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-elecciones',
  templateUrl: './elecciones.component.html',
  styleUrls: ['./elecciones.component.css']
})
export class EleccionesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'fecha', 'acciones'];
  //dataSource = ELEMENT_DATA;
  elecciones: Eleccion[] = [];
  private funciones: FunctionCall[];
  private subscription!: Subscription;

  constructor(
    private abmService: CrudService,
    public dialog: MatDialog,
    private router: Router,
    private setupService: SetupService,
    private functionCallingService: FunctionCallingService,
    private zone: NgZone) {
    this.funciones = [
      {
        name: 'agregar_eleccion',
        description: 'Da de alta una eleccion, abre la vista que contiene el formulario para dar de alta una eleccion en la base de datos',
        parameters: {
          type: "object",
          properties: {
            nombre: {
              type: "string",
              description: "El nombre con el que se registra la eleccion"
            },
            fecha: {
              type: "string",
              description: "La fecha de la eleccion en formato yyyy/MM/dd"
            }
          },
          required: ["nombre"]
        },
      }
    ];
    this.functionCallingService.addFunctions(this.funciones);

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.functionCallingService.removeFunctions(this.funciones);
  }
  ngOnInit(): void {
    this.loadData();
    this.subscription = this.functionCallingService.functionReturned$.subscribe((data: string) => {
      if (data.length > 0 && data.includes("name") && data.includes("arguments")) {
        //obtener funcion
        let responseObject;
        try {
          responseObject = JSON.parse(data);
          //si se puede convertir a objeto, la propiedad name tiene el nombre de la funcion

          if (typeof responseObject.arguments === 'string') {
            // El valor de arguments es una cadena de texto
            responseObject.arguments = JSON.parse(responseObject.arguments);
          } else if (typeof responseObject.arguments === 'object') {
            // El valor de arguments es un objeto

          } else {
            // El valor de arguments no es ni una cadena ni un objeto
            console.error('El valor de arguments no es una cadena ni un objeto:', responseObject.arguments);
            throw new Error("El valor de arguments no es una cadena ni un objeto");
          }
          // Obtener los parámetros individuales
          const nombre = responseObject.arguments.nombre ? responseObject.arguments.nombre : "";
          const fecha = responseObject.arguments.fecha ? responseObject.arguments.fecha : "";

          // Verificar el nombre de la función y ejecutarla con los argumentos correspondientes
          switch (responseObject.name) {
            case 'agregar_eleccion':
              this.zone.run(() => {
                this.abrirModalAgregar(nombre, fecha);
              });
              break;
            default:
              console.log('La función no está definida o no se proporcionó un nombre válido.');
          }
          console.log(data);

        } catch (error) {
          console.error("Error al parsear la respuesta a json")
        }



      }


    });
  }

  loadData() {
    const eleccion = new Eleccion();
    this.abmService.getAllEntity(eleccion).subscribe(
      (data: any[]) => {
        this.elecciones = data.map(x => Object.assign(new Eleccion(), x));
      }
    );
  }

  abrirModalAgregar(nombre?: string, fecha?: string): void {
    let fechaEleccion: any = undefined;
    if (fecha !== undefined && fecha.length > 0) {
      if (this.isValidDate(fecha)) {
        fechaEleccion = new Date(fecha);
      }
    }

    const dialogRef = this.dialog.open(ModalAltaComponent, {
      data: {
        eleccion: { nombre: nombre, fecha: fechaEleccion },
      },
      width: '400px',
      panelClass: 'custom-modal-container', // Agrega la clase CSS personalizada al panelClass,

    });


    dialogRef.afterClosed().subscribe(result => {
      this.zone.run(() => {
        console.log('El modal se cerró');
        this.loadData();
      });
    });


  }
  abrirModalActualizar(eleccion: Eleccion): void {

    // Lógica para abrir el modal de actualización y pasar la elección como parámetro
    const dialogRef = this.dialog.open(ModalAltaComponent, {
      data: {
        eleccion: eleccion
      },
      width: '400px', // Especifica el ancho del modal
      panelClass: 'custom-modal-background', // Aplica la clase personalizada al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica para manejar el resultado del modal de actualización
      this.loadData();
      console.log('Resultado del modal de actualización:', result);
    });


  }

  borrarEleccion(eleccion: Eleccion): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para borrar la elección
        // ...
        this.abmService.delete(eleccion).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Eleccion borrada',
              text: 'La eleccion ha sido borrada exitosamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar eleccion',
              text: 'Ha ocurrido un error al borrar la eleccion'
            });
            console.log(err);
          }
        );
      }
    });
  }

  redirigirSetupEleccion(e: Eleccion) {
    this.setupService.seleccionarEleccion(e);
    this.router.navigate(['/setup-elecccion']);
  }

  isValidDate(dateString: string): boolean {
    const regEx = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dateString.match(regEx)) {
      return false; // El formato no coincide
    }
    const date = new Date(dateString);
    const isValid = date instanceof Date && !isNaN(date.getTime());
    return isValid;
  }
}
