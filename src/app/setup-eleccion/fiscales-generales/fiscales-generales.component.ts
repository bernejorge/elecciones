import { Component, OnInit, ViewChild } from '@angular/core';
import { FiscalesService } from 'src/app/Shared/services/fiscales-mesas.service';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { FiscalMesa } from 'src/app/models/FiscalMesa';

import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FiscalGeneral } from 'src/app/models/FiscalGeneral';
import { FiscalGeneralModalComponent } from './fiscal-general-modal/fiscal-general-modal.component';

@Component({
  selector: 'app-fiscales-generales',
  templateUrl: './fiscales-generales.component.html',
  styleUrls: ['./fiscales-generales.component.css']
})
export class FiscalesGeneralesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  fiscalGeneral: FiscalGeneral[] = []; //
  dataSource!: MatTableDataSource<FiscalGeneral>;
  displayedColumns: string[] = ['escuela', 'eleccion', 'nombre', 'telefono', 'acciones'];


  constructor(private setupService: SetupService, private fiscalService: FiscalesService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.loadData();
  }

   loadData() {
     this.fiscalService.getAllFiscalGenerales().subscribe(
      (res: FiscalGeneral[]) => {
        this.fiscalGeneral = res.map(x => Object.assign(new FiscalGeneral(), x));
        this.dataSource = new MatTableDataSource(this.fiscalGeneral);
        this.dataSource.paginator = this.paginator;
      });

  }
  abrirModalAgregar() {
    const dialogRef = this.dialog.open(FiscalGeneralModalComponent, {
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

  borrarFiscalGeneral(fg: FiscalGeneral) {
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
        this.fiscalService.deleteFiscalGeneral(fg).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Fiscal General borrado',
              text: 'El Fiscal General ha sido borrado correctamente'
            });
            this.loadData();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar escuela',
              text: 'Ha ocurrido un error al borrar el fiscal general'
            });
            console.log(err);
          }
        );
      }
    });
  }
}
