import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignLearnAndEarnFaqComponent } from './campaign-learn-and-earn-faq.component';
import { campaignLearnAndEarnFaqRoutingModule } from './campaign-learn-and-earn-faq-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CampaignLearnAndEarnFaqComponent
  ],
  imports: [
    CommonModule,
    campaignLearnAndEarnFaqRoutingModule,
    MatRadioModule,CarouselModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CampaignLearnAndEarnFaqModule { }
