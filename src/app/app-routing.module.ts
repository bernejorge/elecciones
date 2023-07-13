import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dash', loadChildren: ()=> import('./dash-board/dash-board.module').then(m => m.DashBoardModule) },
  {
    path: 'setup-elecccion',
    loadChildren:()=>import('./setup-eleccion/setup-eleccion.module').then((m) => m.SetupEleccionModule)
  },
  {
    path: 'escrutinio/:id_eleccion',
    loadChildren:()=>import('./Escrutinio/escrutinio.module').then((m) => m.EscrutinioModule)
  },
  {
    path: 'resultados/:id_eleccion',
    loadChildren:()=>import('./resultados/resultados.module').then((m) => m.ResultadosModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
