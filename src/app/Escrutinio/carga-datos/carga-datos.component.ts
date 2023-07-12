import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { DetalleResultado, ResultadoMesa } from 'src/app/models/ResultadoMesa';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.css']
})
export class CargaDatosComponent implements OnInit, OnDestroy {
  cargos: Cargo[] = [];
  listas: ListaElectoral[] = [];
  listasFiltradas: ListaElectoral[] = [];
  mesa!: MesasElectoral;
  eleccion!: Eleccion;
  eleccion_id!: number;
  mesa_id!: number;
  formulario: FormGroup;
  idCargoSelected: number = 0;
  resultadoMesa: ResultadoMesa | undefined;
  navigateSusbcriptions!: Subscription;
  totalVotos: number = 0;

  constructor(private escrutinioService: EscrutinioService, private route: ActivatedRoute,
    private crudService: CrudService, private formBuilder: FormBuilder) {

    this.formulario = this.formBuilder.group({});

  }
  ngOnDestroy(): void {
    this.navigateSusbcriptions.unsubscribe();

  }

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.eleccion_id = params['id_eleccion'];

      if (this.navigateSusbcriptions) {
        this.navigateSusbcriptions.unsubscribe();
      }
      this.navigateSusbcriptions = this.route.params.subscribe(params => {
        this.mesa_id = params['id_mesa'];
        this.resultadoMesa = undefined;
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
    this.idCargoSelected = event.value.id;
    this.filtrarListasPorCargo(this.idCargoSelected);
    // al cambiar el cargo, buscar si hay resultados y mostrarlos
    //si no hay resultados cargar el formulario vacio

    this.escrutinioService.getResultadoMesaPorCargo(this.mesa_id, this.idCargoSelected)
      .subscribe((res: ResultadoMesa) => {
        let resultado = new ResultadoMesa();
        if (res) {
          //si existe el resultado de mesa para el cargo
          //agrego el detalle de los faltantes (rara vez podria venir con faltantes)
          resultado = Object.assign(new ResultadoMesa, res);

        } else {
          resultado.mesa_id = this.mesa_id;
          resultado.cargo_id = this.idCargoSelected;
          resultado.total = 0;
          resultado.votosAfirmativos = 0;
          resultado.votosBlancos = 0;
          resultado.votosImpuganados = 0;
          resultado.votosNulos = 0;
          resultado.votosRecurridos = 0;
          resultado.DetalleResultado = [];
        }
        this.agregarDetallesFaltantes(resultado);
        this.resultadoMesa = resultado;
        console.log(resultado);
        this.actualizarValores();
      });

    console.log('Valor seleccionado:', this.idCargoSelected);
  }

  agregarDetallesFaltantes(resultadoMesa: ResultadoMesa) {
    this.listasFiltradas.forEach((lista: ListaElectoral) => {
      const detalleExistente = resultadoMesa.DetalleResultado.find(detalle => detalle.lista_id === lista.id);

      if (!detalleExistente) {
        const nuevoDetalle: DetalleResultado = {
          mesa_id: this.mesa_id, // Asigna el valor adecuado para mesa_id
          cargo_id: this.idCargoSelected, // Asigna el valor adecuado para cargo_id
          lista_id: lista.id,
          ListaElectoral: lista,
          cantidadVotos: 0 // Asigna el valor inicial adecuado para cantidadVotos
        };

        resultadoMesa.DetalleResultado.push(nuevoDetalle);
      }
    });
  }

  actualizarValores() {
    const rta = this.resultadoMesa?.DetalleResultado.map(i => i.cantidadVotos).reduce(
      (accum, valor) => {
        return accum += valor;
      }
    )
    if (this.resultadoMesa) {
      this.resultadoMesa.votosAfirmativos = rta ? rta : 0;
      const totalVotos = this.resultadoMesa.votosAfirmativos + this.resultadoMesa.votosBlancos
        + this.resultadoMesa.votosImpuganados + this.resultadoMesa.votosNulos + this.resultadoMesa.votosRecurridos;
      this.totalVotos = totalVotos;
    };

  }
  guardar() {
    console.log(this.resultadoMesa);
    if (this.resultadoMesa)
      this.escrutinioService.guardarResultadoMesa(this.resultadoMesa).subscribe(
        {
          next: (res)=>{
            console.log(res);
          },
          error: (err)=>{
            console.log(err);
          }
        }
      );
  }

  validarResultado(): boolean {


    return false;
  }

}
