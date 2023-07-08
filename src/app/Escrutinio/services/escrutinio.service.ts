import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';
import { Escuela } from 'src/app/models/Escuela';
import { ListaElectoral } from 'src/app/models/ListaElectoral';

@Injectable({
  providedIn: 'root'
})
export class EscrutinioService {
  private url: string;
  constructor(private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = Urls.apiUrl;

  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  public getEscuelasDeLaEleccion(id: number) {
    const endPoint = this.url + "escuelas/getEscuelaByEleccion/";
    const eleccion_id = id;

    const params = new HttpParams()
      .set('idEleccion', eleccion_id);

    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.get<Escuela[]>(endPoint, httpOptions);
  }

  public getListasElectoralesPorEleccion(eleccion_id: number) {
    const endPoint = this.url + "listas/obtenerPorEleccion/";

    const params = new HttpParams()
      .set('eleccion_id', eleccion_id);

    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.get<ListaElectoral[]>(endPoint, httpOptions);

  }

}
