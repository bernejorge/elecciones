import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';
import { BaseEntity } from 'src/app/models/BaseEntity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

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

  create<T extends BaseEntity>(entity: T) {
    const endPoint = this.url + entity.endPoint;

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    const { id, ...entityWithoutId } = entity;

    return this.http.post<T>(endPoint, entityWithoutId, httpOptions);

  }

  getAllEntity<T extends BaseEntity>(entity: T) {

    const endPoint = this.url + entity.endPoint;

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    return this.http.get<T[]>(endPoint, httpOptions);
  }

  update<T extends BaseEntity>(entity: T){
    const endPoint = this.url + entity.endPoint + `/${entity.id}`;

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    return this.http.patch<T>(endPoint, entity, httpOptions);
  }

  delete<T extends BaseEntity>(entity: T){
    const endPoint = this.url + entity.endPoint + `/${entity.id}`;

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    return this.http.delete(endPoint, httpOptions)

  }


}
