import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { EscrutinioService } from '../../services/escrutinio.service';

@Component({
  selector: 'app-sidebar-escrutinio',
  templateUrl: './sidebar-escrutinio.component.html',
  styleUrls: ['./sidebar-escrutinio.component.css']
})
export class SidebarEscrutinioComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  data = [
    {
      "id": 1,
      "nombre": "Escuela 6033",
      "direccion": "Av San Martin y Cordoba",
      "cantidadVotantes": null,
      "createdAt": "2023-06-29T22:28:29.361Z",
      "updatedAt": "2023-06-29T22:28:29.361Z",
      "MesaElectorals": [
        {
            "id": 3,
            "numeroMesa": "8046",
            "eleccion_id": 1,
            "cantidad_votantes": 350,
            "createdAt": "2023-07-03T19:03:47.664Z",
            "updatedAt": "2023-07-03T19:03:47.664Z",
            "escuela_id": 1
        },
        {
            "id": 4,
            "numeroMesa": "8047",
            "eleccion_id": 1,
            "cantidad_votantes": 350,
            "createdAt": "2023-07-03T19:04:13.625Z",
            "updatedAt": "2023-07-03T19:04:13.625Z",
            "escuela_id": 1
        },
        {
            "id": 5,
            "numeroMesa": "8048",
            "eleccion_id": 1,
            "cantidad_votantes": 350,
            "createdAt": "2023-07-03T19:04:31.151Z",
            "updatedAt": "2023-07-03T19:04:31.151Z",
            "escuela_id": 1
        },
        {
            "id": 6,
            "numeroMesa": "8049",
            "eleccion_id": 1,
            "cantidad_votantes": 350,
            "createdAt": "2023-07-03T19:04:45.314Z",
            "updatedAt": "2023-07-03T19:04:45.314Z",
            "escuela_id": 1
        },
        {
            "id": 7,
            "numeroMesa": "8050",
            "eleccion_id": 1,
            "cantidad_votantes": 350,
            "createdAt": "2023-07-03T19:05:01.634Z",
            "updatedAt": "2023-07-03T19:05:01.634Z",
            "escuela_id": 1
        },
        {
            "id": 8,
            "numeroMesa": "8051",
            "eleccion_id": 1,
            "cantidad_votantes": 350,
            "createdAt": "2023-07-03T19:05:26.506Z",
            "updatedAt": "2023-07-03T19:05:26.506Z",
            "escuela_id": 1
        },
        {
            "id": 9,
            "numeroMesa": "8052",
            "eleccion_id": 1,
            "cantidad_votantes": 350,
            "createdAt": "2023-07-03T19:06:11.901Z",
            "updatedAt": "2023-07-03T19:06:11.901Z",
            "escuela_id": 1
        },
        {
            "id": 2,
            "numeroMesa": "8046E",
            "eleccion_id": 1,
            "cantidad_votantes": 75,
            "createdAt": "2023-07-03T19:02:46.520Z",
            "updatedAt": "2023-07-05T00:53:34.258Z",
            "escuela_id": 1
        }
    ]
    },
    {
      "id": 2,
      "nombre": "Niño Jesus",
      "direccion": "Guillermo Kirk y 25 de mayo",
      "cantidadVotantes": null,
      "createdAt": "2023-07-03T19:13:51.859Z",
      "updatedAt": "2023-07-03T19:13:51.859Z",
      "MesaElectorals": [
        {
          "id": 10,
          "numeroMesa": "8053",
          "eleccion_id": 1,
          "cantidad_votantes": 350,
          "createdAt":"2023-07-06T00:23:55.107Z",
          "updatedAt": "2023-07-06T00:23:55.107Z",
          "escuela_id": 2
        },
        // ... otras mesas de la escuela Niño Jesus
      ]
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver, private escrutinioService: EscrutinioService){

  }
}
