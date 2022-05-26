import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CampaignCompaniesComponent } from './campaign-companies.component';

const routes: Routes = [
  {
    path: "",
    component: CampaignCompaniesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class campaignCompanyRoutingModule { }
