import { Component, OnInit } from '@angular/core';
import { EscrutinioService } from '../services/escrutinio.service';
import { Cargo } from 'src/app/models/Cargo';
import { ListaElectoral } from 'src/app/models/ListaElectoral';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleccion } from 'src/app/models/Elecciones';
import { MesasElectoral } from 'src/app/models/MesaElectoral';
import { CrudService } from 'src/app/Shared/services/crud.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.css']
})
export class CargaDatosComponent implements OnInit {
  cargos: Cargo[] = [];
  listas: ListaElectoral[] = [];
  listasFiltradas: ListaElectoral[] = [];
  mesa!: MesasElectoral;
  eleccion!: Eleccion;
  eleccion_id!: number;
  mesa_id!: number;
  formulario: FormGroup;
  idCargoSelected : number = 0;

  constructor(private escrutinioService: EscrutinioService, private route: ActivatedRoute,
    private crudService: CrudService, private formBuilder: FormBuilder) {

    this.formulario = this.formBuilder.group({});

  }

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.eleccion_id = params['id_eleccion'];

      this.route.params.subscribe(params => {
        this.mesa_id = params['id_mesa'];
        this.loadMesa();
        this.loadListasElectorales();
      });

    });
  }

  loadCargos() {
    this.cargos = this.listas.map(item => item.Cargo)
      .filter((value, index, self) => self.findIndex(c => c.id === value.id) === index);

    //this.filtrarListasPorCargo(this.cargos[0].id); // Opcional: Selecciona el primer cargo por defecto
  }

  loadListasElectorales() {
    this.escrutinioService.getListasElectoralesPorEleccion(this.eleccion_id)
      .subscribe({
        next: (res: ListaElectoral[]) => {
          this.listas = res;
          this.loadCargos();

        }
      });
  }

  loadMesa() {
    const mesa = new MesasElectoral();
    mesa.id = this.mesa_id;
    this.crudService.getById(mesa).subscribe(
      {
        next: (mesa: MesasElectoral) => {
          this.mesa = mesa;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          });
        },
      }
    );
  }

  filtrarListasPorCargo(cargoId: number) {
    this.listasFiltradas = this.listas.filter(lista => lista.cargo_id === cargoId);

  }

  onSelectChange(event: MatSelectChange) {
    // al cambiar el cargo, buscar si hay resultados y mostrarlos
    //si no hay resultados cargar el formulario vacio
    this.idCargoSelected = event.value;
    this.filtrarListasPorCargo(this.idCargoSelected);


    console.log('Valor seleccionado:', this.idCargoSelected);
  }

}
