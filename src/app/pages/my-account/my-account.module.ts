import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSelectModule } from "@angular/material/select";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { MyAccountComponent } from './my-account.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswrodComponent } from './change-password/change-password.component';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SubscriptionHistoryComponent } from './subscription-history/subscription-history.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    MyAccountComponent,
    SidebarComponent,
    MyProfileComponent,
    ChangePasswrodComponent,
    SubscriptionStatusComponent,
    SubscriptionHistoryComponent
  ],
  imports: [
    MyAccountRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    CarouselModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxSkeletonLoaderModule,
    MatDialogModule,
    MatPaginatorModule
  ],
})
  // @ts-ignore
export class MyAccountModule { }
