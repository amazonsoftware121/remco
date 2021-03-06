import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { campaignRoutingModule } from './campaign-routing.module';
import { AnimatedDigitComponent } from './animated/animated-digit.component';


@NgModule({
  declarations: [
    CampaignComponent,AnimatedDigitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    campaignRoutingModule
  ]
})
export class CampaignModule { }
