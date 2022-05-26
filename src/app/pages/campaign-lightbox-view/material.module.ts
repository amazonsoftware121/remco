import { NgModule } from '@angular/core';


import {} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
