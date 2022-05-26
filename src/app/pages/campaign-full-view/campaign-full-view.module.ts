import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CompanyContestComponent } from './campaign-full-view.component';
import { companyContestRoutingModule } from './campaign-full-view-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/environments/material.module';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

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
    CompanyContestComponent
  ],
  imports: [
    CommonModule,
    ShareButtonsModule.withConfig(customConfig),
    ShareIconsModule,
    companyContestRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
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
export class CompanyContestModule {}
