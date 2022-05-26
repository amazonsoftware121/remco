import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestFullviewGallaryComponent } from './contest-fullview-gallary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { contestGalleryRoutingModule } from './contest-fullview-gallary-routing.module';
import { ContestFullviewGallaryVoteComponent } from './contest-fullview-gallary-vote/contest-fullview-gallary-vote.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ContestFullviewGallaryComponent,ContestFullviewGallaryVoteComponent
  ],
  imports: [
    contestGalleryRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule
  ],
  entryComponents:[
    ContestFullviewGallaryVoteComponent,
  ]
})
export class ContestFullviewGallaryModule { }
