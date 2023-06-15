import { BaseEntity } from "./BaseEntity";

export class Eleccion extends BaseEntity {
  public static override endURL(): string {
      return "elecciones";
  }

  nombre!: string;
  fecha!: Date;

  constructor(){
    super();

  }
  override get endPoint(): string {
    return "elecciones";
  }
  override getFilterText(): string {
    return `${this.nombre} ` ;
  }

}
