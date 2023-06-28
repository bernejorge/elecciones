import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';
import { FiscalMesa } from 'src/app/models/FiscalMesa';
import { SetupService } from './setup.service';
import { lastValueFrom } from 'rxjs';
import { ListaElectoral } from 'src/app/models/ListaElectoral';
import { FiscalGeneral } from 'src/app/models/FiscalGeneral';
import { Eleccion } from 'src/app/models/Elecciones';

@Injectable({
  providedIn: 'root'
})
export class FiscalesService {

  url: string;
  eleccion: Eleccion | null = null;
  constructor(@Inject(API_URLS) private Urls: AppSetings, private http: HttpClient, private setupService: SetupService) {
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

  getAllFiscalesMesas() {
    const endPoint = this.url + 'fiscalesdemesas';

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    return this.http.get<FiscalMesa[]>(endPoint, httpOptions);
  }

  setFiscalMesa(idCompanero: number, idMesa: number) {
    const endPoint = this.url + 'fiscalesdemesas'
    const body = {
      mesa_id: idMesa,
      companero_id: idCompanero
    }
    let httpOptions = {
      headers: this.getHttpHeaders(),
    };
    return this.http.post(endPoint, body, httpOptions);
  }

  deleteFiscalMesa(idCompanero: number, idMesa: number) {
    const endPoint = this.url + `fiscalesdemesas/${idMesa}/${idCompanero}`;
    const body = {
      mesa_id: idMesa,
      companero_id: idCompanero
    }
    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    return this.http.delete(endPoint, httpOptions);

  }

   getAllFiscalGenerales() {
    const endPoint = this.url + 'fiscalesgenerales/obtenerPorEleccion';
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

    return this.http.get<FiscalGeneral[]>(endPoint, httpOptions);

  }

  setFiscalGeneral(fg: FiscalGeneral) {
    const endPoint = this.url + 'fiscalesgenerales';
    const { id, ...entityWithoutId } = fg;

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    return this.http.post<FiscalGeneral>(endPoint, entityWithoutId, httpOptions);
  }

  deleteFiscalGeneral(fg: FiscalGeneral) {
    const endPoint = this.url + `${fg.endPoint}`;

    const companero_id = fg.companero_id;
    const escuela_id = fg.escuela_id;
    const eleccion_id = fg.eleccion_id;

    const params = new HttpParams()
      .set('eleccion_id', eleccion_id)
      .set('escuela_id', escuela_id)
      .set('companero_id', companero_id);


    const httpOptions = {
      headers: this.getHttpHeaders(),
      params: params,
    };

    return this.http.delete(endPoint, httpOptions);
  }

}
