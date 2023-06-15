import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';
import { FiscalMesa } from 'src/app/models/FiscalMesa';

@Injectable({
  providedIn: 'root'
})
export class FiscalesMesasService {

  url: string;
  constructor(@Inject(API_URLS) private Urls: AppSetings, private http: HttpClient) {
    this.url = this.Urls.apiUrl;

  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  getAllFiscales() {
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

}
