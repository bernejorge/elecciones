import { Cargo } from "./Cargo";
import { ListaElectoral } from "./ListaElectoral";
import { MesasElectoral } from "./MesaElectoral";

export class ResultadoMesa {

  mesa_id!: number;
  cargo_id!: number;
  votosAfirmativos!: number;
  votosBlancos!: number;
  votosNulos!: number;
  votosRecurridos!: number;
  votosImpuganados!: number;
  total!: number;
  MesaElectoral!: MesasElectoral | undefined;
  Cargo!: Cargo;
  DetalleResultado: DetalleResultado[]=[];

}

export class DetalleResultado {

  mesa_id!: number;
  cargo_id!: number;
  lista_id!: number;
  cantidadVotos: number = 0;
  ListaElectoral! : ListaElectoral;


}
