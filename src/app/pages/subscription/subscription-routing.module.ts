import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { subscriptionComponent } from "./subscription.component";

const routes: Routes = [
  {
    path: "",
    component: subscriptionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class subscriptionRoutingModule { }
