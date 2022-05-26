import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CampaignEmailFormsComponent } from "./campaign-email-forms.component";



const routes: Routes = [
  {
    path: "",
    component: CampaignEmailFormsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class campaignEmailFormsRoutingModule { }
