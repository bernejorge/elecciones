export abstract class  BaseEntity {

  id!: number;
  abstract get endPoint(): string;
  abstract getFilterText(): string;
  public  static endURL(): string {return ""};

  static Filtrar<Type extends BaseEntity>(arg: Type[], filtro: string): Type[] {
    if (filtro == "") {
        return arg;
    } else {
        let result = arg.filter(
            (x: Type) => {
                return x.getFilterText().toLowerCase().match(filtro.toLowerCase())
            }
        );
        return result;
    }
}

}
