import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: ':action',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class LoginRoutingModule { }
