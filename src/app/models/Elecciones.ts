import { BaseEntity } from "./BaseEntity";

export class Eleccion extends BaseEntity {
  public static override endURL(): string {
      return "elecciones";
  }

  nombre: string;
  fecha: Date;

  constructor(nombre: string, fecha: Date){
    super();
    this.nombre = nombre;
    this.fecha = fecha;
  }
  override get endPoint(): string {
    return "elecciones";
  }

}
