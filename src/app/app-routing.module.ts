import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './pages/user/user.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BaseHistoricaComponent } from './pages/base-historica/base-historica.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { GestoresComponent } from './pages/gestores/gestores.component';
import { MapasComponent } from './pages/mapas/mapas.component';
import { PeriodoVigenteComponent } from './pages/periodo-vigente/periodo-vigente.component';

const routes: Routes = [
  { path: '',               component: TablaComponent, pathMatch: 'full' },
  { path: 'baseHistorica',  component: BaseHistoricaComponent },
  { path: 'favoritos',      component: FavoritosComponent },
  { path: 'gestores',       component: GestoresComponent },
  { path: 'mapas',          component: MapasComponent },
  { path: 'periodoVigente', component: PeriodoVigenteComponent },
  { path: 'usuario',        component: UserComponent },
  { path: 'tabla',          component: DashboardComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
