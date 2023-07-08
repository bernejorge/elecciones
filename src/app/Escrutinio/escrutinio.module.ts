import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SidebarEscrutinioComponent } from './layout/sidebar-escrutinio/sidebar-escrutinio.component';
import { EscrutinioRoutingModule } from './escrutinio-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Shared/modules/material.module';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SidebarEscrutinioComponent,
    CargaDatosComponent
  ],
  imports: [
    CommonModule,
    EscrutinioRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LayoutComponent,SidebarEscrutinioComponent]
})
export class EscrutinioModule { }
