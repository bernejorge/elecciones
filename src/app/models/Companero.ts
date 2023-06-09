import { BaseEntity } from "./BaseEntity";

export class Companero extends BaseEntity{

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
