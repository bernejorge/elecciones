import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { MesasElectoral } from 'src/app/models/MesaElectoral';
import { MesasModalComponent } from './mesas-modal/mesas-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  mesas: MesasElectoral[]= [];
  displayedColumns: string[] = ['numeroMesa', 'escuela', 'eleccion', 'cantidad_votantes', 'acciones'];

  constructor(private ambServices: CrudService, public dialog: MatDialog){

  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const m = new MesasElectoral();

    this.ambServices.getAllEntity<MesasElectoral>(m).subscribe(
      (res:any[]) => {
        this.mesas = res.map(x=> Object.assign(new MesasElectoral(), x));
      }
    )
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(MesasModalComponent, {
      data: {
        mesa: undefined
      },
      width: '500px', // Especifica el ancho del modal
      panelClass: 'custom-modal-background', // Aplica la clase personalizada al modal
      // Otras opciones del modal...
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se cerró');
      // Realizar acciones después de cerrar el modal, como llamar al servicio de ABM
      this.loadData();
    });
  }

  abrirModalActualizar(mesa: MesasElectoral): void {

    // Lógica para abrir el modal de actualización y pasar la elección como parámetro
    const dialogRef = this.dialog.open(MesasModalComponent, {
      data: {
        mesa: mesa,
      },
      width: '500px', // Especifica el ancho del modal
      panelClass: 'custom-modal-background', // Aplica la clase personalizada al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica para manejar el resultado del modal de actualización
      this.loadData();
      console.log('Resultado del modal de actualización:', result);
    });
  }

  borrarEleccion(mesa : MesasElectoral): void {
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
        this.ambServices.delete(mesa).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Escuela borrada',
              text: 'La mesa  ha sido borrada exitosamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar escuela',
              text: 'Ha ocurrido un error al borrar la mesa'
            });
            console.log(err);
          }
        );
      }
    });
  }


}
