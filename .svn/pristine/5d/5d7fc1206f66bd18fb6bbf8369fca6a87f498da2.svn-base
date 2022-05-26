import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CampaignLightboxViewComponent } from './campaign-lightbox-view.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { CampaignLightboxViewFormComponent } from './campaign-lightbox-view-form/campaign-lightbox-view-form.component';
import { campaignlightboxRoutingModule } from './campaign-lightbox-view-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/environments/material.module';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';




@NgModule({
  declarations: [
    CampaignLightboxViewComponent,CampaignLightboxViewFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    campaignlightboxRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MaterialExampleModule
  ],
  entryComponents: [
    CampaignLightboxViewFormComponent,
    CampaignRules
  ],
  providers: [
    DatePipe
  ]
})
export class CampaignLightboxViewModule { }
