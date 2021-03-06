import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  {
    path: "",
    component: ResetPasswordComponent
  },
  {
    path: ':action',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class ResetPasswordRoutingModule { }
