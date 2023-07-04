import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPartidos'
})
export class FilterPartidosPipe implements PipeTransform {
  transform(partidos: any[], filterValue: string): any[] {
    if (!partidos || !filterValue) {
      return partidos;
    }

    return partidos.filter(partido => partido.nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }
}
