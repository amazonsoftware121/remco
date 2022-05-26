import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { participateRigister } from './partcipate-register.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    participateRigister
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BrowserModule,
    FormsModule
  ]
})
export class CampaignCompaniesDetailesModule { }
