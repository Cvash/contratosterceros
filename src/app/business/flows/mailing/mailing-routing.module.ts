import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MailingHomeComponent } from "./components/mailing-home/mailing-home.component";
import { MailingStatusComponent } from "./components/mailing-status/mailing-status.component";

const routes:Routes=[
    {
        path:"mailing",
        component:MailingHomeComponent
    },
    {
        path:"status",
        component:MailingStatusComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MailingRoutingModule{
}