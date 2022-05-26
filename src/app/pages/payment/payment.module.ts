import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { paymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [
    paymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    NgxPayPalModule 

  ]
})
  // @ts-ignore
export class paymentModule { }
