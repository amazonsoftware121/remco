import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CampaignLearnAndEarnFaqComponent } from "./campaign-learn-and-earn-faq.component";



const routes: Routes = [
  {
    path: "",
    component: CampaignLearnAndEarnFaqComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class campaignLearnAndEarnFaqRoutingModule { }
