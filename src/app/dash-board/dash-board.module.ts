import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { MaterialModule } from '../Shared/modules/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashBoardComponent } from './dash-board.component';
import { CargosComponent } from './abm/cargos/cargos.component';
import { ModalCargosAltaComponent } from './abm/cargos/modal-cargos-alta/modal-cargos-alta.component';


@NgModule({
  declarations: [
    SidebarComponent,
    DashBoardComponent,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MaterialModule
  ]
})
export class DashBoardModule { }
