import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';
import { Eleccion } from 'src/app/models/Elecciones';
import { ListaElectoral } from 'src/app/models/ListaElectoral';

@Injectable({
  providedIn: 'any'
})
export class ListasService {

  eleccion: Eleccion | null = null;
  url: string;
  constructor(@Inject(API_URLS) private Urls: AppSetings,
    private http: HttpClient, private setupService: SetupService) {

    this.url = this.Urls.apiUrl;
    this.setupService.eleccionOb$.subscribe(
      (res: Eleccion|null)=>{
        this.eleccion = res;
      }
    );
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  getAllByEleccion(){
    const endPoint = this.url + 'listas/obtenerPorEleccion';
    let eleccion_id = 0;
    if(this.eleccion) {
      eleccion_id = this.eleccion.id;
    }
    const params = new HttpParams()
      .set('eleccion_id', eleccion_id);

    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.get<ListaElectoral[]>(endPoint, httpOptions);
  }

  setListaElectoral(listaElectoral: ListaElectoral){
    const endPoint = this.url + "listas";
    const {id, ...entityWithoutId} = listaElectoral;

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    return this.http.post<ListaElectoral>(endPoint, entityWithoutId, httpOptions);
  }

}
