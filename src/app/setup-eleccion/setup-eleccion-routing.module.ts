import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/setup-eleccion/layout/layout.component';
import { MesasComponent } from '../dash-board/abm/mesas/mesas.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'mesa-electoral', component: MesasComponent}
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupEleccionRoutingModule { }
