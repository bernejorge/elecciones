import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { MaterialModule } from '../Shared/modules/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashBoardComponent } from './dash-board.component';


@NgModule({
  declarations: [
    SidebarComponent,
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MaterialModule
  ]
})
export class DashBoardModule { }
