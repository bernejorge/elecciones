import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Eleccion } from 'src/app/models/Elecciones';
import { Escuela } from 'src/app/models/Escuela';

import Swal from 'sweetalert2';
import { ModalEscuelasComponent } from './modal-escuelas/modal-escuelas.component';


@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css']
})
export class EscuelasComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'direccion', 'acciones'];
  escuelas: Escuela[] = [];

  constructor(private abmServices: CrudService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const e = new Escuela();
    this.abmServices.getAllEntity(e).subscribe(
      (data: any[]) => {
        this.escuelas = data.map(x => Object.assign(new Escuela(), x));

      });
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(ModalEscuelasComponent, {
      data: {
        escula: undefined
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

  abrirModalActualizar(escuela: Escuela): void {

    // Lógica para abrir el modal de actualización y pasar la elección como parámetro
    const dialogRef = this.dialog.open(ModalEscuelasComponent, {
      data: {
        escuela: escuela
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

  borrarEleccion(escuela: Escuela): void {
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
        this.abmServices.delete(escuela).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Escuela borrada',
              text: 'La escuela ha sido borrada exitosamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar escuela',
              text: 'Ha ocurrido un error al borrar la escuela'
            });
            console.log(err);
          }
        );
      }
    });
  }
}
