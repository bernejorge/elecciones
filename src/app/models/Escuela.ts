import { BaseEntity } from "./BaseEntity";
import { MesasElectoral } from "./MesaElectoral";

export class Escuela extends BaseEntity {


  nombre!: string;
  direccion!: string;
  MesaElectorals: MesasElectoral[] = [];
  constructor(){
    super();

  }
  override get endPoint(): string {
    return "escuelas";
  }

  override getFilterText(): string {
    return `${this.nombre}` ;
  }

}
