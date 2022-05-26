import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContestViewEntryComponent } from "./contest-view-entry.component";



const routes: Routes = [
  {
    path: "",
    component: ContestViewEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class contestViewEntryModule { }
