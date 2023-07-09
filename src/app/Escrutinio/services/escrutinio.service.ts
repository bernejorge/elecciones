import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';
import { Escuela } from 'src/app/models/Escuela';
import { ListaElectoral } from 'src/app/models/ListaElectoral';
import { ResultadoMesa } from 'src/app/models/ResultadoMesa';

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

  public getResultadoMesaPorCargo(id_mesa: number, id_cargo: number){
    const endPoint = this.url + "resultadoMesa";
    let params = new HttpParams();
    params.set('id_mesa', id_mesa);
    params.set('id_cargo', id_cargo);

    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.get<ResultadoMesa>(endPoint, httpOptions);
  }

  public guardarResultadoMesa(resultado : ResultadoMesa){
    const endPoint = this.url + "gurdarResultado"

    let params = new HttpParams();
    params.set('id_mesa', resultado.mesa_id);
    params.set('id_cargo', resultado.cargo_id);

    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    this.http.post(endPoint, resultado, httpOptions);
  }


}
