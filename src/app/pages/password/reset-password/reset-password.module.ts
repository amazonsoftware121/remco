import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    ResetPasswordRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
})
  // @ts-ignore
export class ResetPasswordModule { }
