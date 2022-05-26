import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CampaignLearnAndEarnComponent } from "./campaign-learn-and-earn.component";



const routes: Routes = [
  {
    path: "",
    component: CampaignLearnAndEarnComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class campaignLearnAndEarnRoutingModule { }
