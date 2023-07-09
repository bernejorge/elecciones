import { BaseEntity } from "./BaseEntity";
import { Eleccion } from "./Elecciones";
import { Escuela } from "./Escuela";
import { ResultadoMesa } from "./ResultadoMesa";

export class MesasElectoral extends BaseEntity{
  numeroMesa!: number;
  eleccion_id!: number;
  escuela_id!: number;
  cantidad_votantes!: number;

  Escuela!: Escuela;
  Eleccion!: Eleccion;
  Resultado!: ResultadoMesa;

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
