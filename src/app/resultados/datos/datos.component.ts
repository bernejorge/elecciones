import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadoService } from '../resultados.service';
import { DetalleResultado } from 'src/app/models/ResultadoMesa';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';


interface VotosPorCargo {
  name: string;
  votes: number;
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  eleccion_id: number = 0;
  detalles: DetalleResultado[] = [];
  votos: VotosPorCargo[] = [];
  hayNuevosDatos: boolean = false;
  cargos = 3;
  chartOptions: Highcharts.Options = {};
  candidatosPorDhont : string[] = [];
  panelOpenState = false;

  private socketSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private resultadoService: ResultadoService) {

    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Gráfico de Votos por Cargo'
      },
      series: [{
        type: 'pie',
        name: 'Votos',
        data: this.votos.map(item => [item.name, item.votes])
      }]
    };


  }
  ngOnInit(): void {
    this.eleccion_id = Number(this.route.snapshot.paramMap.get('id_eleccion'));

    this.resultadoService.connect();

    // Escucha el evento 'nuevaNotificacion' del socket
    this.socketSubscription = this.resultadoService.onNuevaNotificacion().subscribe((data: any) => {
      console.log('Nueva notificación recibida:', data.mensaje);
      // Realiza acciones adicionales con los datos recibidos
      this.refresh();
    });

    // Obtiene todos los parámetros de la URL, incluyendo el query string
    this.route.queryParams.subscribe(params => {
      // Accede a los valores específicos del query string
      const parametro1 = params['cargos'];
      this.cargos = (parametro1 !== undefined) ? parametro1 : 3;

    });

    this.refresh();

  }

  refresh() {
    this.hayNuevosDatos = false;

    this.resultadoService.getResultadosPorCargo(this.eleccion_id, 1)
      .subscribe(
        {
          next: (result: DetalleResultado[]) => {
            console.log(result);
            this.detalles = result.map(x => Object.assign(new DetalleResultado, x));

            this.votos = this.detalles.reduce((acumulador: VotosPorCargo[], actual: DetalleResultado) => {
              const concejal = actual.ListaElectoral.nombre + ' ' + actual.ListaElectoral.Candidato.nombre + ' ' + actual.ListaElectoral.Candidato.apellido;
              const votos = actual.cantidadVotos;

              // Verificar si el concejal ya existe en el acumulador
              const indice = acumulador.findIndex(item => item.name === concejal);
              if (indice !== -1) {
                // Si ya existe, sumar los votos al concejal existente
                acumulador[indice].votes += votos;
              } else {
                // Si no existe, agregar un nuevo objeto al acumulador
                acumulador.push({ name: concejal, votes: votos });
              }

              return acumulador;
            }, []).sort((a, b) => b.votes - a.votes);

            this.chartOptions = {
              chart: {
                type: 'pie'
              },
              title: {
                text: 'Gráfico de Votos por Cargo'
              },
              series: [{
                type: 'pie',
                name: 'Votos',
                data: this.votos.map(item => [item.name, item.votes])
              }]
            };

            Highcharts.chart('chartContainer', this.chartOptions);

            this.candidatosPorDhont = this.asignarCargos(this.votos, this.cargos);
          }
        }
      );

  }

  asignarCargos(votos: VotosPorCargo[], cantidadCargos: number): string[] {

    let canditosCargos: string[] = [];
    const asignaciones: {
      name: string;
      cociente: number;
    }[] = [];

    votos.forEach(v => {
      for (let i = 0; i < cantidadCargos; i++) {
        const cociente = v.votes / (i+1);
        asignaciones.push({
          name: v.name,
          cociente: cociente
        });
      }
    });

    let votosOrdenados = [...asignaciones].sort((a, b) => b.cociente - a.cociente);
    // Tomar los primeros 'cantidadEscaños' candidatos
    const ganadores = votosOrdenados.slice(0, cantidadCargos);
    return ganadores.map(g => `${g.name} - Cociente = ${g.cociente}`);
  }



}
