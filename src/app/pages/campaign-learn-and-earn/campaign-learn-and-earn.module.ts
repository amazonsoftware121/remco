import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignLearnAndEarnComponent } from './campaign-learn-and-earn.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { campaignLearnAndEarnRoutingModule } from './campaign-learn-and-earn-routing.module';
import { CampaignCompaniesDetailesComponent } from '../campaign-contest-detailes/campaign-contest-detailes.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    CampaignLearnAndEarnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    campaignLearnAndEarnRoutingModule,
    MatPaginatorModule
  ],
  entryComponents: [
    CampaignCompaniesDetailesComponent
  ],
})
export class CampaignLearnAndEarnModule { }
