import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TestimonialsComponent } from './testimonials.component';
import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TestimonialsComponent
  ],
  imports: [
    TestimonialsRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
  // @ts-ignore
export class TestimonialsModule { }
