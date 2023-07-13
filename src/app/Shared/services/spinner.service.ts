import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _spinner = new BehaviorSubject<boolean>(false);
  public spinner$ = this._spinner.asObservable();
  constructor() { }

  mostrarSpinner(){
    console.log('mostrar Spinner');
    this._spinner.next(true);
  }

  ocultarSpinner(){
    console.log('ocultar Spinner');
    this._spinner.next(false);
  }
}
