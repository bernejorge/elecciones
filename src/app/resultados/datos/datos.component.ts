import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadoService } from '../resultados.service';
import { DetalleResultado } from 'src/app/models/ResultadoMesa';
import { Subscription } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';


interface VotosPorCargo {
  name: string;
  value: number;
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


  private socketSubscription!: Subscription;

  constructor(private router: ActivatedRoute, private resultadoService: ResultadoService) {

  }
  ngOnInit(): void {
    this.eleccion_id = Number(this.router.snapshot.paramMap.get('id_eleccion'));

    this.resultadoService.connect();

    // Escucha el evento 'nuevaNotificacion' del socket
    this.socketSubscription = this.resultadoService.onNuevaNotificacion().subscribe((data: any) => {
      console.log('Nueva notificación recibida:', data.mensaje);
      // Realiza acciones adicionales con los datos recibidos
      this.refresh();
    });

    this.refresh();

  }

  refresh(){
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
                acumulador[indice].value += votos;
              } else {
                // Si no existe, agregar un nuevo objeto al acumulador
                acumulador.push({ name: concejal, value: votos });
              }

              return acumulador;
            }, []);


          }
        }
      );

  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
