import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Candidato } from 'src/app/models/Candidato';
import { CrudService } from '../../services/crud.service';
import { BaseEntity } from 'src/app/models/BaseEntity';

@Component({
  selector: 'app-select-candidato',
  templateUrl: './select-candidato.component.html',
  styleUrls: ['./select-candidato.component.css']
})
export class SelectCandidatoComponent implements OnInit {
  candidatos: Candidato[] = [];
  candidatosFiltrados = this.candidatos;
  displayedColumns: string[] = ['nombre', 'apellido']; // Agrega aquí otras columnas que quieras mostrar

  _filterText: string = '';
  selectedCandidato: Candidato | undefined = undefined;

  constructor(
    private dialogRef: MatDialogRef<SelectCandidatoComponent>,
    private companeroService: CrudService
  ) {


  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const c = new Candidato();
    this.companeroService.getAllEntity<Candidato>(c).subscribe(
      (res: any[]) => {
        this.candidatos = res.map(x=> Object.assign(new Candidato(), x))
        this.candidatosFiltrados = this.candidatos;
      }
    );
  }

  applyFilter(filterValue:any) {
    // Aplicar el filtro al valor del campo de filtro
    this.candidatosFiltrados = BaseEntity.Filtrar(this.candidatos, filterValue);
  }

  selectCandidato(candidato: Candidato) {
    this.selectedCandidato = candidato;
  }

  selectAndClose(candidato: Candidato) {
    this.selectedCandidato = candidato;
    this.dialogRef.close(candidato);
  }

  isSelected(candidato: Candidato): boolean {
    return this.selectedCandidato === candidato;
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
    this.selectedCandidato = undefined;
    this.dialogRef.close();
  }

}
