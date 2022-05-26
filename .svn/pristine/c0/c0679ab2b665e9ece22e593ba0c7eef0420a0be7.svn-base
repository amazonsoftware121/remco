import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContestViewEntryComponent } from './contest-view-entry.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/environments/material.module';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';
import { contestViewEntryModule } from './contest-view-entry-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ClipboardModule } from '@angular/cdk/clipboard';

const customConfig = {
  prop: {
    facebook: {
      icon: ['fab', 'fa-facebook-official'],
      text: 'Share'
    },
    twitter: {
      icon: ['fab', 'fa-twitter-square'],
      text: 'Tweet'
    },
    // and so on...
  }
};

@NgModule({
  declarations: [
    ContestViewEntryComponent
  ],
  imports: [
    CommonModule,
    ShareButtonsModule.withConfig(customConfig),
    ShareIconsModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MaterialExampleModule,
    contestViewEntryModule,
    NgxSkeletonLoaderModule,
    ClipboardModule

  ],
  entryComponents: [
    CampaignRules
  ],
  providers: [
    DatePipe
  ]
})
export class ContestViewEntryModule { }
