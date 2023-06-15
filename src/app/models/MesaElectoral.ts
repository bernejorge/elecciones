import { BaseEntity } from "./BaseEntity";
import { Eleccion } from "./Elecciones";
import { Escuela } from "./Escuela";

export class MesasElectoral extends BaseEntity{
  numeroMesa!: number;
  eleccion_id!: number;
  escuela_id!: number;
  cantidad_votantes!: number;

  Escuela!: Escuela;
  Eleccion!: Eleccion;


  constructor(){
    super();

  }

  override get endPoint(): string {
    return "mesas";
  }

  override getFilterText(): string {
    return `${this.numeroMesa.toString()}` ;
  }

}
