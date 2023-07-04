import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { Candidato } from 'src/app/models/Candidato';
import { Cargo } from 'src/app/models/Cargo';
import { Eleccion } from 'src/app/models/Elecciones';
import { ListaElectoral } from 'src/app/models/ListaElectoral';
import { Partido } from 'src/app/models/Partido';
import { ListasService } from '../../service/listas.service';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { SelectCandidatoComponent } from 'src/app/Shared/components/select-candidato/select-candidato.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-listas',
  templateUrl: './modal-listas.component.html',
  styleUrls: ['./modal-listas.component.css']
})
export class ModalListasComponent implements OnInit {

  isUpdate: boolean = false;
  lista: ListaElectoral | undefined;
  partidos: Partido[] = [];
  cargos: Cargo[] = [];
  form!: FormGroup;
  eleccion: Eleccion | null = null;


  private _partidoElegido: Partido | undefined;
  public _candidatoSeleccionado: Candidato | undefined = undefined;
  private _cargoSeleccionado: Cargo | undefined = undefined;

  private _listaElegida: ListaElectoral | undefined;

  constructor(
    private dialog: MatDialog,
    private setupService: SetupService,
    public dialogRef: MatDialogRef<ModalListasComponent>,
    private formBuilder: FormBuilder,
    private listaService: ListasService,
    private abmService: CrudService,

    @Inject(MAT_DIALOG_DATA) public data: { lista: ListaElectoral | undefined }
  ) {
    this._listaElegida = data.lista;

    this.form = this.formBuilder.group({
      numero_lista: ['', Validators.required],
      nombre: ['', Validators.required],
      partido_id: ['', Validators.required],
      candidato_id: ['', Validators.required],
      eleccion_id: ['', Validators.required],
      cargo_id: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.setupService.eleccionOb$.subscribe(
      (res: any) => {
        //obtengo la eleccion que estamos seteando
        this.eleccion = res;
        this.form.get('eleccion_id')?.setValue(res.id);
      });

    this.loadData();
  }

  loadData() {

    //cargar PARTIDOS POLITICOS
    const p = new Partido;
    this.abmService.getAllEntity<Partido>(p).subscribe(
      (res: Partido[]) => {
        this.partidos = res.map(p => Object.assign(new Partido, p));
      }
    );

    //cargar CARGOS POLITICOS
    const c = new Cargo;
    this.abmService.getAllEntity<Cargo>(c).subscribe(
      (res: Cargo[]) => {
        this.cargos = res.map(c => Object.assign(new Cargo, c));
      }
    );

    if (this._listaElegida && this._listaElegida.id > 0) {
      //si tengo seteada una lista con id, entonces es un UPDATE
      this.isUpdate = true;
      this.form.get('numero_lista')?.setValue(this._listaElegida.numero_lista);
      this.form.get('nombre')?.setValue(this._listaElegida.nombre);
      this.form.get('partido_id')?.setValue(this._listaElegida.partido_id);
      this.form.get('candidato_id')?.setValue(this._listaElegida.candidato_id);
      this.form.get('eleccion_id')?.setValue(this._listaElegida.eleccion_id);
      this.form.get('cargo_id')?.setValue(this._listaElegida.cargo_id);
    }


  }

  openSelectCandidatoModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const dialogRef = this.dialog.open(SelectCandidatoComponent, {

      width: '900px',
      panelClass: 'custom-modal-container', // Agrega la clase CSS personalizada al panelClass,

    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Aquí obtienes el candidato seleccionado y puedes realizar las acciones necesarias
        console.log(result);
        this._candidatoSeleccionado = result;
        this.form.get('candidato_id')?.setValue(result.id);
      }
    });
  }

  set partidoElegido(partidoElegido: Partido | undefined) {
    this._partidoElegido = partidoElegido;
  }

  set cargoElegido(cargoElegido: Cargo | undefined) {
    this._cargoSeleccionado = cargoElegido;
  }

  setLista() {
    let lista = new ListaElectoral();
    lista = Object.assign(new ListaElectoral(), this.form.value);
    this.listaService.setListaElectoral(lista).subscribe(
      {
        next: (res: any) => {
          if (res.errors) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.errors[0].message,
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Configuracion exitosa',
              text: `Se genero un nuevo Fical de Mesa`
            }).then(() => { this.dialogRef.close() });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.errors[0].message,
          });
        }
      }
    );
  }


  displayPartido(partido: any): string {
    if (partido) {
      //this.form.get('partido_id')?.setValue(partido.id);
      return partido.nombre ;
    } else{
      return '';
    }
  }


  filterPartidos(partidoValue: string): any[] {
    // Implementa tu lógica de filtrado aquí
    // Devuelve las opciones de partido que coincidan con el valor de filtro

    // Ejemplo básico
    return this.partidos.filter(partido => partido.nombre.toLowerCase().includes(partidoValue.toLowerCase()));
  }

  closeModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Lógica para cerrar el modal
    this.dialogRef.close();
  }

}
