import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from '../../components/components.module';
import { subscriptionRoutingModule } from './subscription-routing.module';
import { subscriptionComponent } from './subscription.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgxPayPalModule } from 'ngx-paypal';
import { RegisterCongratsComponent } from './register-congrats/register-congrats.component';

@NgModule({
  declarations: [
    subscriptionComponent,RegisterCongratsComponent
  ],
  imports: [
    subscriptionRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    MatRadioModule,
    NgxPayPalModule
  ],
})
export class VideoResourcesModule { }
