import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'carga/:id_mesa', component: CargaDatosComponent}, //
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscrutinioRoutingModule { }
