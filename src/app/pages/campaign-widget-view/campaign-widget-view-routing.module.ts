import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CampaignWidgetViewComponent } from './campaign-widget-view.component';

const routes: Routes = [
  {
    path: "",
    component: CampaignWidgetViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class campaignWidgetRoutingModule { }
