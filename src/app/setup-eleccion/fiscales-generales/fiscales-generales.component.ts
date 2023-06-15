import { Component, OnInit, ViewChild } from '@angular/core';
import { FiscalesMesasService } from 'src/app/Shared/services/fiscales-mesas.service';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { FiscalMesa } from 'src/app/models/FiscalMesa';

import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FiscalGeneral } from 'src/app/models/FiscalGeneral';

@Component({
  selector: 'app-fiscales-generales',
  templateUrl: './fiscales-generales.component.html',
  styleUrls: ['./fiscales-generales.component.css']
})
export class FiscalesGeneralesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  fiscalesMesas: FiscalGeneral[] = []; //
  dataSource!: MatTableDataSource<FiscalMesa>;
  displayedColumns: string[] = ['escuela', 'mesa', 'eleccion', 'nombre', 'telefono', 'acciones'];





  abrirModalAgregar(){

  }

  borrarFiscalGeneral(fg: FiscalGeneral){

  }
}
