import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupEleccionRoutingModule } from './setup-eleccion-routing.module';
import { LayoutComponent } from 'src/app/setup-eleccion/layout/layout.component';
import { MaterialModule } from 'src/app/Shared/modules/material.module';
import { SidebarSetupComponent } from './sidebar-setup/sidebar-setup.component';
import { FiscalesMesasComponent } from './fiscales-mesas/fiscales-mesas.component';
import { FiscalesGeneralesComponent } from './fiscales-generales/fiscales-generales.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarSetupComponent,
    FiscalesMesasComponent,
    FiscalesGeneralesComponent
  ],
  imports: [
    CommonModule,
    SetupEleccionRoutingModule,
    MaterialModule
  ],

})
export class SetupEleccionModule { }
