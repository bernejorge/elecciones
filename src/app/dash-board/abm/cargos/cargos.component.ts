import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Cargo } from 'src/app/models/Cargo';
import Swal from 'sweetalert2';
import { ModalCargosAltaComponent } from './modal-cargos-alta/modal-cargos-alta.component';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent {
  displayedColumns: string[] = ['nombre', 'acciones'];
  candidatos: Cargo[]= [];

  constructor(private abmServices: CrudService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const cargo = new Cargo();

    this.abmServices.getAllEntity(cargo).subscribe(
      (res:any[])=>{
        this.candidatos = res.map(x=> Object.assign(new Cargo(), x));
      }
    );
  }
  borrarCargo(c: Cargo){
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
              title: 'Cargo borrado',
              text: 'Los datos han sido borrados exitosamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar Cargo ',
              text: 'Ha ocurrido un error al borrar los datos'
            });
            console.log(err);
          }
        );
      }
    });
  }

  abrirModal(c?: Cargo){
    // Lógica para abrir el modal de actualización y pasar la elección como parámetro
    const dialogRef = this.dialog.open(ModalCargosAltaComponent, {
      data: {
        cargo: c
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

}
