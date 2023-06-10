import { BaseEntity } from "./BaseEntity";

export class Escuela extends BaseEntity {


  nombre!: string;
  direccion!: string;

  constructor(){
    super();

  }
  override get endPoint(): string {
    return "escuelas";
  }

}
