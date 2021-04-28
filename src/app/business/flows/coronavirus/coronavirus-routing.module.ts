import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { CoronavirusAdminComponent } from './components/coronavirus-admin/coronavirus-admin.component';
import { CoronavirusCheckingComponent } from './components/coronavirus-checking/coronavirus-checking.component';
import { CoronavirusHomeComponent } from './components/coronavirus-home/coronavirus-home.component';

const routes:Routes=[
    {
        path:"home",
        component:CoronavirusHomeComponent
    },
    {
        path:"home/:cause",
        component:CoronavirusHomeComponent
    },
    {
        path:"home/:cip",
        component:CoronavirusHomeComponent
    },
    {
        path:"admin",
        component:CoronavirusAdminComponent
    },
    {
        path:"checking",
        component:CoronavirusCheckingComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoronavirusRoutingModule{
}