import { BaseEntity } from "./BaseEntity";

export class Companero extends BaseEntity{
  override getFilterText(): string {
    return `${this.nombre} ${this.apellido} ${this.dni}` ;
  }

  nombre!: string;
  apellido!: string;
  dni!: number;
  direccion!: string;
  tel!: string;

  constructor(){
    super();
  }

  override get endPoint(): string {
    return "companeros";
  }

}
