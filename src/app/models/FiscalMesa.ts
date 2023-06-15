import { BaseEntity } from "./BaseEntity";
import { Companero } from "./Companero";
import { MesasElectoral } from "./MesaElectoral";

export class FiscalMesa extends BaseEntity{

  mesa_id!: number;
  companero_id!: number;

  MesaElectoral!: MesasElectoral;
  Companero!: Companero;


  constructor(){
    super();

  }

  override get endPoint(): string {
    return "fiscalesdemesas";
  }

  override getFilterText(): string {
    return `${this.Companero.nombre} ${this.MesaElectoral.numeroMesa.toString()}` ;
  }

}
