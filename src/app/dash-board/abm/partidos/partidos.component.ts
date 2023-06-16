import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Partido } from 'src/app/models/Partido';
import { ModalPartidosComponent } from './modal-partidos/modal-partidos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {
  displayedColumns: string[] = [ 'nombre', 'acciones'];
  partidos: Partido[]= [];

  constructor(private abmServices: CrudService, public dialog: MatDialog){


  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const partido = new Partido();

    this.abmServices.getAllEntity(partido).subscribe(
      (res:any[])=>{
        this.partidos = res.map(x=> Object.assign(new Partido(), x));
      }
    );
  }

  abrirModalAgregar(){
    const dialogRef = this.dialog.open(ModalPartidosComponent, {
      data: {
        partido: undefined
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

  abrirModalActualizar(p: Partido){
    // Lógica para abrir el modal de actualización y pasar la elección como parámetro
    const dialogRef = this.dialog.open(ModalPartidosComponent, {
      data: {
        partido: p
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

  borrarCandidato(p: Partido){
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
        this.abmServices.delete(p).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Partido borrado',
              text: 'Los datos han sido borrados exitosamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar Partido ',
              text: 'Ha ocurrido un error al borrar los datos'
            });
            console.log(err);
          }
        );
      }
    });
  }
}
