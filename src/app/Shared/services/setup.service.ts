import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';

import { Eleccion } from 'src/app/models/Elecciones';
import { Escuela } from 'src/app/models/Escuela';
import { MesasElectoral } from 'src/app/models/MesaElectoral';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  private eleccionSeleccionada = new BehaviorSubject<Eleccion | null>(null);
  public eleccionOb$ = this.eleccionSeleccionada.asObservable();
  private eleccion: Eleccion | null = null;
  url: string = "";

  constructor(@Inject(API_URLS) private Urls: AppSetings, private http: HttpClient) {
    this.url = this.Urls.apiUrl;

  }

  seleccionarEleccion(eleccion: Eleccion): void {
    this.eleccion = eleccion;
    this.eleccionSeleccionada.next(eleccion);
  }

  obtenerEleccionSeleccionada() {
    return this.eleccionSeleccionada.asObservable();
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  getMesasByEscuela(e: Escuela) {
    const endPoint = this.url + "mesas/byEscuela";
    const eleccion_id = this.eleccion ? this.eleccion.id : 0;

    const params = new HttpParams()
      .set('idEscuela', e.id)
      .set('idEleccion', eleccion_id);


    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.get<MesasElectoral[]>(endPoint, httpOptions);
  }
}


