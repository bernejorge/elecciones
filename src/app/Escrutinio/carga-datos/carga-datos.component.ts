import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
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
import { FunctionCallingService } from 'src/app/Shared/services/functionCalling.service';
import { FunctionCall } from 'src/app/models/FunctionInterface';

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
  private subscription!: Subscription;

  private funciones: any[] = [];

  constructor(private escrutinioService: EscrutinioService, private route: ActivatedRoute,  private zone: NgZone,
    private crudService: CrudService, private formBuilder: FormBuilder, private functionCallingService: FunctionCallingService) {

    this.formulario = this.formBuilder.group({});
    const prompt = `You have the following candidates/political parties name:
    `;

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

    this.subscription = this.functionCallingService.functionReturned$.subscribe((data: string) => {
      this.zone.run(() => {
      if (data.length > 0 && data.includes("name") ) {

        const responseObject = JSON.parse(data);
        responseObject.arguments =  JSON.parse(responseObject.arguments);

          switch (responseObject.name.trim()) {
            case 'set_votes':
              this.cargarResultadoPorVoz(responseObject.arguments );
              break;

            default:
              console.log('La función no está definida o no se proporcionó un nombre válido.');
          }


        // Verificar el nombre de la función y ejecutarla con los argumentos correspondientes

        console.log(data);

      }
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
    this.armarFunctionsCallings();

    this.functionCallingService.addPromptText(this.armarPromt());


    console.log('Valor seleccionado:', this.idCargoSelected);
  }

  armarFunctionsCallings(){
    this.funciones = [
      {
        name: 'set_votes',
        description: "",
        parameters: {
            type: 'object',
            properties: {
                votes: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: {type: 'string', description: 'Name of candidate, e.g. Juan Manuel'},
                            id: {type: 'string', description: 'Id of candidate, e.g. 1'},
                            qty_vote: {type: 'integer', description:'Number of votes, e.g. 100'}
                        },
                    }
                },
            },
        }
      }
    ];
    this.functionCallingService.addFunctions( this.funciones);
  }
  armarPromt() : string {

    let prompt = `You have the following candidates name / candidate ID number /political parties name/political parties number:`;
    for (let i = 0; i < this.listasFiltradas.length; i++) {
      const l = this.listasFiltradas[i];
      prompt = prompt + "\n" + `${i}. ${l.Candidato.nombre} ${l.Candidato.apellido} / ${l.Candidato.id} / ${l.nombre} /  ${l.numero_lista}`;

    }
    prompt = prompt + '\n' + 'The goal is set the votes for candidates in the list above.';
    return prompt;
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
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
  }

  validarResultado(): boolean {


    return false;
  }

  cargarResultadoPorVoz(argumentos : any){
    argumentos.votes.forEach((c: any)=> {
      const dr = this.resultadoMesa?.DetalleResultado.find(x=> x.ListaElectoral.Candidato.id == c.id);
      if(dr){
        //si encuentro el candidato, modifico el detalle,
        dr.cantidadVotos = c.qty_vote;
      }

    });
    this.actualizarValores();
  }


}
