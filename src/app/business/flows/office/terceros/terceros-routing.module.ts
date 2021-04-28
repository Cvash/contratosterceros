import { NgModule } from '@angular/core';
import { SupplierHomeComponent } from './components/supplier-home/supplier-home.component';
import { RouterModule, Routes } from '@angular/router';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { MypassComponent } from './components/mypass/mypass.component';
import { SupplierReportSympComponent } from './components/supplier-report-symp/supplier-report-symp.component';
import { SupplierSecurityComponent } from './components/supplier-security/supplier-security.component';
import { SupplierReportDataComponent } from './components/supplier-report-data/supplier-report-data.component';
import { SupplierAdminCompanyComponent } from './components/supplier-admin-company/supplier-admin-company.component';
import { SupplierAdminSupplierComponent } from './components/supplier-admin-supplier/supplier-admin-supplier.component';

const routes:Routes=[
    {
        path:'home',
        component:SupplierHomeComponent
    },
    {
        path:'form',
        component:SupplierFormComponent
    },
    {
        path:"mypass",
        component:MypassComponent
    },
    {
        path:"sintomas",
        component:SupplierReportSympComponent
    },
    {
        path:"security",
        component:SupplierSecurityComponent
    },
    {
        path:"report",
        component:SupplierReportDataComponent
    },
    {
        path:"empresas",
        component:SupplierAdminCompanyComponent
    },
    {
        path:"admin",
        component:SupplierAdminSupplierComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TercerosRoutingModule { }
