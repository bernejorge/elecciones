export abstract class  BaseEntity {

  id!: number;
  abstract get endPoint(): string;
  public  static endURL(): string {return ""};

}
