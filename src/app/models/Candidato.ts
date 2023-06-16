import { BaseEntity } from "./BaseEntity";

export class Candidato extends BaseEntity{
  override getFilterText(): string {
    return `${this.nombre} ${this.apellido}` ;
  }

  nombre!: string;
  apellido!: string;

  constructor(){
    super();
  }

  override get endPoint(): string {
    return "candidatos";
  }

}
