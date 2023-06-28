import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/setup-eleccion/layout/layout.component';
import { MesasComponent } from '../dash-board/abm/mesas/mesas.component';
import { FiscalesMesasComponent } from './fiscales-mesas/fiscales-mesas.component';
import { FiscalGeneral } from '../models/FiscalGeneral';
import { FiscalesGeneralesComponent } from './fiscales-generales/fiscales-generales.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'mesa-electoral', component: MesasComponent},
      {path: 'fiscales-mesas', component: FiscalesMesasComponent},
      {path: 'fiscales-generales', component: FiscalesGeneralesComponent}
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupEleccionRoutingModule { }
