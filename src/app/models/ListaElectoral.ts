import { BaseEntity } from "./BaseEntity";
import { Candidato } from "./Candidato";
import { Eleccion } from "./Elecciones";
import { Escuela } from "./Escuela";
import { Partido } from "./Partido";

export class ListaElectoral extends BaseEntity{
  numero_lista!: number;
  nombre!: string;
  partido_id!: number;
  candidato_id!: number;
  eleccion_id!: number;

  Partido!: Partido;
  Candidato!: Candidato;
  Eleccion!: Eleccion;


  constructor(){
    super();

  }

  override get endPoint(): string {
    return "mesas";
  }

  override getFilterText(): string {
    return `${this.numero_lista.toString()} ${this.nombre}` ;
  }

}
