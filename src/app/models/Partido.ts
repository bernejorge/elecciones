import { BaseEntity } from "./BaseEntity";

export class Partido extends BaseEntity{
  override getFilterText(): string {
    return `${this.nombre} ` ;
  }

  nombre!: string;

  constructor(){
    super();
  }

  override get endPoint(): string {
    return "partidos";
  }

}
