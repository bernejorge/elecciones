import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Eleccion } from 'src/app/models/Elecciones';
import { ModalAltaComponent } from './modal-alta/modal-alta.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/Shared/services/setup.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-elecciones',
  templateUrl: './elecciones.component.html',
  styleUrls: ['./elecciones.component.css']
})
export class EleccionesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'fecha', 'acciones'];
  dataSource = ELEMENT_DATA;
  elecciones: Eleccion[] = [];

  constructor(
    private abmService: CrudService,
    public dialog: MatDialog,
    private router: Router,
    private setupService: SetupService) {

  }
  ngOnInit(): void {
    this.loadData();
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

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(ModalAltaComponent, {
      data: {
        eleccion: undefined
      },
      width: '400px', // Especifica el ancho del modal
      panelClass: 'custom-modal-background', // Aplica la clase personalizada al modal
      // Otras opciones del modal...
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se cerró');
      // Realizar acciones después de cerrar el modal, como llamar al servicio de ABM
      this.loadData();
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

}
