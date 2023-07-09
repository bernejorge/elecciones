import { Cargo } from "./Cargo";
import { MesasElectoral } from "./MesaElectoral";

export class ResultadoMesa {

  mesa_id!: number;
  cargo_id!: number;
  votosAfirmativos!: number;
  votosBlancos!: number;
  votosNulos!: number;
  votosRecurridos!: number;
  votosImpuganados!: number;
  MesaElectoral!: MesasElectoral | undefined;
  Cargo!: Cargo;
  DetalleResultado!: any[];

  constructor(mesa_id: number, cargo_id: number){
    this.mesa_id = mesa_id;
    this.cargo_id = cargo_id;
  }

}

export class DetalleResultado {

  mesa_id!: number;
  cargo_id!: number;
  lista_id!: number;
  cantidadVotos!: number;

  constructor(mesa_id: number, cargo_id: number, lista_id: number, cantidadVotos: number) {
    this.mesa_id = mesa_id;
    this.cargo_id = cargo_id;
    this.lista_id = lista_id;
    this.cantidadVotos = cantidadVotos;

  }

}
