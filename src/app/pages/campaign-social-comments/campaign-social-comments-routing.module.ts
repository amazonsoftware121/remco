import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CampaignSocialCommentsComponent } from "./campaign-social-comments.component";



const routes: Routes = [
  {
    path: "",
    component: CampaignSocialCommentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class campaignSocialCommentsRoutingModule { }
