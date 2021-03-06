import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    ContactUsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
})
  // @ts-ignore
export class ContactUsModule { }
