import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocumentHomeComponent } from "./components/document-home/document-home.component";
import { DocumentStatusComponent } from "./components/document-status/document-status.component";


const router: Routes = [{
  path: "generator",
  component: DocumentHomeComponent
},
{
  path: "status",
  component: DocumentStatusComponent
}]


@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class DocgenerateRoutingModule { }
