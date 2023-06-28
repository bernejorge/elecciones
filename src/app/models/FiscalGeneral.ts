import { BaseEntity } from "./BaseEntity";
import { Companero } from "./Companero";
import { Eleccion } from "./Elecciones";
import { Escuela } from "./Escuela";

export class FiscalGeneral extends BaseEntity{
  override get endPoint(): string {
    return "fiscalesgenerales";
  }
  override getFilterText(): string {
    throw new Error("Method not implemented.");
  }

  companero_id!: number;
  escuela_id!: number;
  eleccion_id!: number;

  Companero!: Companero;
  Escuela!: Escuela;
  Eleccion!:Eleccion;

  constructor(){
    super();
  }
}
