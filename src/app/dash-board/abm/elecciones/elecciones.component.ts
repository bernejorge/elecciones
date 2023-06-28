import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
    private changeDetectorRef: ChangeDetectorRef) {
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
        const responseObject = JSON.parse(data);

        const { name, arguments: argumentsString } = responseObject; // Desestructuración para obtener name y arguments
        let argumentsObject;

        //obtener argumentos de la función
        try {
           argumentsObject = JSON.parse(argumentsString); // Convertir la cadena de texto de arguments a un objeto
        } catch (error) {

        }

        // Obtener los parámetros individuales
        const nombre = argumentsObject.nombre ? argumentsObject.nombre : "";
        const fecha = argumentsObject.fecha ? argumentsObject.fecha : "";

        // Verificar el nombre de la función y ejecutarla con los argumentos correspondientes
        switch (responseObject.name) {
          case 'agregar_eleccion':
            this.abrirModalAgregar(nombre, fecha);
            break;
          default:
            console.log('La función no está definida o no se proporcionó un nombre válido.');
        }
        console.log(data);

      }


    });
  }

  loadData(){
    const eleccion = new Eleccion();
    // console.log(res);
    // this.problemas = res.Problemas.map(x=> Object.assign(new Problema(),x));
    // this.problemasFiltrados = this.problemas;
    this.abmService.getAllEntity(eleccion).subscribe(
      (data: any[]) => {
        this.elecciones = data.map(x=> Object.assign(new Eleccion(),x));
      }
    );
  }

  abrirModalAgregar(nombre?: string, fecha?: string): void {
    let fechaEleccion: any = undefined;
    if(fecha !== undefined && fecha.length > 0) {
      if (this.isValidDate(fecha)){
        fechaEleccion = new Date(fecha);
      }
    }

    const dialogRef = this.dialog.open(ModalAltaComponent, {
      data: {
        eleccion: undefined,
      },
      width: '400px',
      panelClass: 'custom-modal-background',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      this.loadData();
    });

    dialogRef.componentInstance.ngOnInit();

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
