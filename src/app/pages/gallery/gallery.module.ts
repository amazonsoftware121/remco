import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    GalleryRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
  // @ts-ignore
export class GalleryModule { }
