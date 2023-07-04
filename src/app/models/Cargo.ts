import { BaseEntity } from "./BaseEntity";

export class Cargo extends BaseEntity{

  nombre!: string;

  constructor(){
    super();
  }

  get endPoint(): string {
   return "cargos";
  }

  getFilterText(): string {
    return this.nombre;
  }

}
