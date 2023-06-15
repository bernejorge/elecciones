import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Companero } from 'src/app/models/Companero';
import { CrudService } from '../../services/crud.service';
import { BaseEntity } from 'src/app/models/BaseEntity';

@Component({
  selector: 'app-select-companero-modal',
  templateUrl: './select-companero-modal.component.html',
  styleUrls: ['./select-companero-modal.component.css']
})
export class SelectCompaneroModalComponent implements OnInit {
  companeros: Companero[] = [];
  companerosFiltrados = this.companeros;
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'tel']; // Agrega aquí otras columnas que quieras mostrar

  _filterText: string = '';
  selectedCompanero: Companero | undefined = undefined;

  constructor(
    private dialogRef: MatDialogRef<SelectCompaneroModalComponent>,
    private companeroService: CrudService
  ) {


  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const c = new Companero();
    this.companeroService.getAllEntity<Companero>(c).subscribe(
      (res: any[]) => {
        this.companeros = res.map(x=> Object.assign(new Companero(), x))
        this.companerosFiltrados = this.companeros;
      }
    );
  }

  applyFilter(filterValue:any) {
    // Aplicar el filtro al valor del campo de filtro
    this.companerosFiltrados = BaseEntity.Filtrar(this.companeros, filterValue);
  }

  selectCompanero(companero: Companero) {
    this.selectedCompanero = companero;
  }

  selectAndClose(companero: Companero) {
    this.selectedCompanero = companero;
    this.dialogRef.close(companero);
  }

  isSelected(companero: Companero): boolean {
    return this.selectedCompanero === companero;
  }

  get filterText(): string {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    // Aquí puedes realizar las acciones que deseas cuando filterText cambia de valor
    console.log('Nuevo valor de filterText:', value);
    // Luego, puedes aplicar el filtro a tu dataSource o realizar otras operaciones necesarias
    this.applyFilter(value);
  }


  cancel() {
    this.selectedCompanero = undefined;
    this.dialogRef.close();
  }
}
