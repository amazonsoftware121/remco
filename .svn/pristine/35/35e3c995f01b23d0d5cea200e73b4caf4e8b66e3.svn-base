import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CampaignWidgetViewComponent } from '../campaign-widget-view/campaign-widget-view.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { campaignWidgetRoutingModule } from './campaign-widget-view-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';
import { MaterialExampleModule } from 'src/environments/material.module';



@NgModule({
  declarations: [
    CampaignWidgetViewComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    campaignWidgetRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MaterialExampleModule
  ],
  entryComponents: [
    CampaignRules
  ],
  providers: [
    DatePipe
  ]
})
export class CampaignWidgetViewModule { }
