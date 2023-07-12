import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';
import { Escuela } from 'src/app/models/Escuela';
import { ListaElectoral } from 'src/app/models/ListaElectoral';
import { DetalleResultado, ResultadoMesa } from 'src/app/models/ResultadoMesa';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private url: string;
  private socket: Socket;

  constructor(private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = Urls.apiUrl;
    const urlSinApi = this.url.replace(/\/api\/$/, "");
    this.socket = io(urlSinApi);

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

    let params = new HttpParams()
      .set('eleccion_id', eleccion_id);

    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.get<ListaElectoral[]>(endPoint, httpOptions);

  }

  public getResultadosPorCargo(eleccion_id: number, cargo_id: number) {
    const endPoint = this.url + "escrutinio/todosPorCargo";

    let params = new HttpParams()
    params = params.set('eleccion_id', eleccion_id);
    params = params.set('cargo_id', cargo_id);

    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.get<DetalleResultado[]>(endPoint, httpOptions);
  }

  public connect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public onNuevaNotificacion(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('nuevaNotificacion', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.off('nuevaNotificacion');
      };
    });
  }

}
