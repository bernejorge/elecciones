import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { ListaElectoral } from 'src/app/models/ListaElectoral';
import Swal from 'sweetalert2';
import { ModalListasComponent } from './modal-listas/modal-listas.component';
import { ListasService } from '../service/listas.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listas-electorales',
  templateUrl: './listas-electorales.component.html',
  styleUrls: ['./listas-electorales.component.css']
})
export class ListasElectoralesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  listasElectorales!: ListaElectoral[];
  dataSource!: MatTableDataSource<ListaElectoral>;
  displayedColumns: string[] = ['numero', 'nombre', 'partido', 'cargo', 'candidato','acciones'];

  constructor(private abmService: CrudService, private listaService: ListasService, private setupService: SetupService,
    public dialog: MatDialog, private zone: NgZone) {

  }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    const l = new ListaElectoral();
    this.listaService.getAllByEleccion()
      .subscribe(res => {
        this.listasElectorales = res.map(e => Object.assign(new ListaElectoral(), e));
        this.dataSource = new MatTableDataSource(this.listasElectorales);
        this.dataSource.paginator = this.paginator;
      });


  }

  abrirModal(lista?: ListaElectoral): void {
    const dialogRef = this.dialog.open(ModalListasComponent, {
      data: {
        eleccion: { lista },
      },
      width: '600px',
      panelClass: 'custom-modal-container', // Agrega la clase CSS personalizada al panelClass,

    });


    dialogRef.afterClosed().subscribe(result => {
      this.zone.run(() => {
        console.log('El modal se cerró');
        this.loadData();
      });
    });


  }

  borrarListaElectoral(l: ListaElectoral) {

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
        this.abmService.delete(l).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Lista Borrada borrada',
              text: 'La lista elecotral ha sido borrada exitosamente'
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
