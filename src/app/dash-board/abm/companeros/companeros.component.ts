import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Eleccion } from 'src/app/models/Elecciones';
import { ModalAltaComponent } from './modal-alta/modal-alta.component';
import Swal from 'sweetalert2';
import { Companero } from 'src/app/models/Companero';

@Component({
  selector: 'app-companeros',
  templateUrl: './companeros.component.html',
  styleUrls: ['./companeros.component.css']
})
export class CompanerosComponent implements OnInit {
  displayedColumns: string[] = ['Apellido', 'Nombre', 'Telefono', 'Direccion', 'DNI'];
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
}
