import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleccionesComponent } from './elecciones/elecciones.component';
import { CompanerosComponent } from './companeros/companeros.component';
import { EscuelasComponent } from './escuelas/escuelas.component';
import { MesasComponent } from './mesas/mesas.component';

const routes: Routes = [
  {path: 'elecciones', component:EleccionesComponent},
  {path: 'companeros', component:CompanerosComponent},
  {path: 'escuelas', component: EscuelasComponent},
  {path: 'mesas', component: MesasComponent},
  // { path: 'setup-elecciones', loadChildren: () => import('./../setup-eleccion/setup-eleccion.module').then(m => m.SetupEleccionModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmRoutingModule { }
