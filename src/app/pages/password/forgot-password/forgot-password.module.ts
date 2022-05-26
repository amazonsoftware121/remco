import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    ForgotPasswordRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
})
  // @ts-ignore
export class ForgotPasswordModule { }
