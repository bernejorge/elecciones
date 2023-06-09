import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Eleccion } from 'src/app/models/Elecciones';
import { ModalCompaneroComponent } from './modal-alta/modal-alta.component';
import Swal from 'sweetalert2';
import { Companero } from 'src/app/models/Companero';

@Component({
  selector: 'app-companeros',
  templateUrl: './companeros.component.html',
  styleUrls: ['./companeros.component.css']
})
export class CompanerosComponent implements OnInit {
  displayedColumns: string[] = ['apellido', 'nombre', 'telefono', 'direccion', 'dni', 'acciones'];
  companeros: Companero[]= [];

  constructor(private abmServices: CrudService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const companero = new Companero();

    this.abmServices.getAllEntity(companero).subscribe(
      (res:any[])=>{
        this.companeros = res.map(x=> Object.assign(new Companero(), x));
      }
    );
  }

  abrirModalAgregar(){
    const dialogRef = this.dialog.open(ModalCompaneroComponent, {
      data: {
        Companero: undefined
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

  abrirModalActualizar(c: Companero) {

    // Lógica para abrir el modal de actualización y pasar la elección como parámetro
    const dialogRef = this.dialog.open(ModalCompaneroComponent, {
      data: {
        companero: c
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

  borrarEleccion(c: Companero){
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
        this.abmServices.delete(c).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Compañero/a borrado/a',
              text: 'Los datos han sido borrados exitosamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar Companñero ',
              text: 'Ha ocurrido un error al borrar los datos'
            });
            console.log(err);
          }
        );
      }
    });
  }
}
