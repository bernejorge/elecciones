import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Candidato } from 'src/app/models/Candidato';
import { CandidatosModalComponent } from './candidatos-modal/candidatos-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {
  displayedColumns: string[] = ['apellido', 'nombre', 'acciones'];
  candidatos: Candidato[]= [];

  constructor(private abmServices: CrudService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const companero = new Candidato();

    this.abmServices.getAllEntity(companero).subscribe(
      (res:any[])=>{
        this.candidatos = res.map(x=> Object.assign(new Candidato(), x));
      }
    );
  }

  abrirModalAgregar(){
    const dialogRef = this.dialog.open(CandidatosModalComponent, {
      data: {
        candidato: undefined
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

  abrirModalActualizar(c: Candidato){
    // Lógica para abrir el modal de actualización y pasar la elección como parámetro
    const dialogRef = this.dialog.open(CandidatosModalComponent, {
      data: {
        candidato: c
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

  borrarCandidato(c: Candidato){
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
              title: 'Candidato/a borrado/a',
              text: 'Los datos han sido borrados exitosamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar Candidato ',
              text: 'Ha ocurrido un error al borrar los datos'
            });
            console.log(err);
          }
        );
      }
    });
  }

}
