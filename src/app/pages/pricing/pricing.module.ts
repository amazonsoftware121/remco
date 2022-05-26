import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PricingComponent } from './pricing.component';
import { PricingRoutingModule } from './pricing-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { paymentComponent } from '../payment/payment.component';


@NgModule({
  declarations: [
    PricingComponent
  ],
  imports: [
    PricingRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
 
  ],
  entryComponents:[paymentComponent]
})
  // @ts-ignore
export class PricingModule { }
