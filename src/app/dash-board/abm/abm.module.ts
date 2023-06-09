import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbmRoutingModule } from './abm-routing.module';
import { EleccionesComponent } from './elecciones/elecciones.component';
import { MaterialModule } from 'src/app/Shared/modules/material.module';
import { ModalAltaComponent } from './elecciones/modal-alta/modal-alta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EleccionesComponent, ModalAltaComponent],
  imports: [
    CommonModule,
    AbmRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AbmModule { }
