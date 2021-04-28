import { NgModule } from '@angular/core';
import { HomeGeneralComponent } from './home-general/home-general.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: HomeGeneralComponent,
    
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeGeneralRoutingModule { }
