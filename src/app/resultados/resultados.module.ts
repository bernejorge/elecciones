import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './datos/datos.component';
import { ResultadosRoutingModule } from './resultados-routing.module';
import { MaterialModule } from '../Shared/modules/material.module';



@NgModule({
  declarations: [
    DatosComponent
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule,
    MaterialModule

  ]
})
export class ResultadosModule { }
