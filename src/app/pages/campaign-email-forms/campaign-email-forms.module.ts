import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignEmailFormsComponent } from './campaign-email-forms.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { campaignEmailFormsRoutingModule } from './campaign-email-forms-routing.module';
import { CampaignCompaniesDetailesComponent } from '../campaign-contest-detailes/campaign-contest-detailes.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    CampaignEmailFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    campaignEmailFormsRoutingModule ,
    MatPaginatorModule
  ],
  entryComponents: [
    CampaignCompaniesDetailesComponent
  ],
})
export class CampaignEmailFormsModule { }
