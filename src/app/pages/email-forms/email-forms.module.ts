import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { EmailFormsComponent } from './email-forms.component';
import { EmailFormsRoutingModule } from './email-forms-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EmailFormsComponent
  ],
  imports: [
    EmailFormsRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
  // @ts-ignore
export class EmailFormsModule { }
