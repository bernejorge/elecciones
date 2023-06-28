import { Component, OnInit, ViewChild } from '@angular/core';
import { FiscalesService } from 'src/app/Shared/services/fiscales-mesas.service';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { FiscalMesa } from 'src/app/models/FiscalMesa';
import { FiscalMesaModalComponent } from './fiscal-mesa-modal/fiscal-mesa-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fiscales-mesas',
  templateUrl: './fiscales-mesas.component.html',
  styleUrls: ['./fiscales-mesas.component.css']
})
export class FiscalesMesasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  fiscalesMesas: FiscalMesa[] = []; //
  dataSource!: MatTableDataSource<FiscalMesa>;
  displayedColumns: string[] = ['escuela', 'mesa', 'eleccion', 'nombre', 'telefono', 'acciones'];

  constructor(private setupService: SetupService, private fiscalService: FiscalesService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.fiscalService.getAllFiscalesMesas().subscribe(
      (res: FiscalMesa[]) => {
        this.fiscalesMesas = res.map(x => Object.assign(new FiscalMesa(), x));
        this.dataSource = new MatTableDataSource(this.fiscalesMesas);
        this.dataSource.paginator = this.paginator;
      }
    );

  }

  abrirModalAgregar() {
    const dialogRef = this.dialog.open(FiscalMesaModalComponent, {
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

  borrarFiscalMesa(f: FiscalMesa) {

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
        this.fiscalService.deleteFiscalMesa(f.companero_id, f.mesa_id).subscribe(
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
