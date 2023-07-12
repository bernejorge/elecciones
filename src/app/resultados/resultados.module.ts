import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './datos/datos.component';
import { ResultadosRoutingModule } from './resultados-routing.module';



@NgModule({
  declarations: [
    DatosComponent
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule,

  ]
})
export class ResultadosModule { }
