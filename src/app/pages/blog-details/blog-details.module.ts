import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { BlogDetailsComponent } from './blog-details.component';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BlogDetailsComponent
  ],
  imports: [
    BlogDetailsRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
  // @ts-ignore
export class BlogDetailsModule { }
