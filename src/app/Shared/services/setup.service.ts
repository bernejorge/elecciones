import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Eleccion } from 'src/app/models/Elecciones';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  private eleccionSeleccionada = new BehaviorSubject<Eleccion | null>(null);
  public eleccionOb$ = this.eleccionSeleccionada.asObservable();
  constructor() { }

  seleccionarEleccion(eleccion: Eleccion) :void{
    this.eleccionSeleccionada.next(eleccion);
  }

  obtenerEleccionSeleccionada() {
    return this.eleccionSeleccionada.asObservable();
  }
}
