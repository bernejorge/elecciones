import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbmRoutingModule } from './abm-routing.module';
import { EleccionesComponent } from './elecciones/elecciones.component';
import { MaterialModule } from 'src/app/Shared/modules/material.module';
import { ModalAltaComponent } from './elecciones/modal-alta/modal-alta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanerosComponent } from './companeros/companeros.component';
import { ModalCompaneroComponent } from './companeros/modal-alta/modal-alta.component';
import { EscuelasComponent } from './escuelas/escuelas.component';
import { ModalEscuelasComponent } from './escuelas/modal-escuelas/modal-escuelas.component';
import { MesasComponent } from './mesas/mesas.component';
import { MesasModalComponent } from './mesas/mesas-modal/mesas-modal.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { CandidatosModalComponent } from './candidatos/candidatos-modal/candidatos-modal.component';
import { PartidosComponent } from './partidos/partidos.component';
import { ModalPartidosComponent } from './partidos/modal-partidos/modal-partidos.component';

@NgModule({
  declarations: [
    EleccionesComponent,
    ModalAltaComponent,
    CompanerosComponent,
    ModalCompaneroComponent,
    EscuelasComponent,
    ModalEscuelasComponent,
    MesasComponent,
    MesasModalComponent,
    CandidatosComponent,
    CandidatosModalComponent,
    PartidosComponent,
    ModalPartidosComponent,
  ],
  imports: [
    CommonModule,
    AbmRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],

})
export class AbmModule {}
