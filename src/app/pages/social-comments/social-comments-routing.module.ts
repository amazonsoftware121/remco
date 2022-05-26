import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SocialCommentsComponent } from './social-comments.component';

const routes: Routes = [
  {
    path: "",
    component: SocialCommentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class SocialCommentsRoutingModule { }
