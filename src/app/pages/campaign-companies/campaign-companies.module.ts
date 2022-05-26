import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignCompaniesComponent } from './campaign-companies.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { campaignCompanyRoutingModule } from './campaign-companies-routing.module';



@NgModule({
  declarations: [
    CampaignCompaniesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    campaignCompanyRoutingModule 
  ]
})
export class CampaignCompaniesModule { }
