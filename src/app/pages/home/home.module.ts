import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    CarouselModule,
  ],
})
  // @ts-ignore
export class HomeModule { }
