import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ContestComponent } from './contest.component';
import { ContestRoutingModule } from './contest-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContestComponent
  ],
  imports: [
    ContestRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
  // @ts-ignore
export class ContestModule { }
