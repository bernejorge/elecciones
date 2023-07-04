import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupEleccionRoutingModule } from './setup-eleccion-routing.module';
import { LayoutComponent } from 'src/app/setup-eleccion/layout/layout.component';
import { MaterialModule } from 'src/app/Shared/modules/material.module';
import { SidebarSetupComponent } from './sidebar-setup/sidebar-setup.component';
import { FiscalesMesasComponent } from './fiscales-mesas/fiscales-mesas.component';
import { FiscalesGeneralesComponent } from './fiscales-generales/fiscales-generales.component';
import { FiscalMesaModalComponent } from './fiscales-mesas/fiscal-mesa-modal/fiscal-mesa-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiscalGeneralModalComponent } from './fiscales-generales/fiscal-general-modal/fiscal-general-modal.component';
import { ListasElectoralesComponent } from './listas-electorales/listas-electorales.component';
import { ModalListasComponent } from './listas-electorales/modal-listas/modal-listas.component';
import { FilterPartidosPipe } from '../Shared/pipes/filter-partidos.pipe';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarSetupComponent,
    FiscalesMesasComponent,
    FiscalesGeneralesComponent,
    FiscalMesaModalComponent,
    FiscalGeneralModalComponent,
    ListasElectoralesComponent,
    ModalListasComponent,
    FilterPartidosPipe // Agrega el pipe aquí
  ],
  imports: [
    CommonModule,
    SetupEleccionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],

})
export class SetupEleccionModule { }
