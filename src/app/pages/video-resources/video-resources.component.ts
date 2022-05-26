import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LoaderService } from '../../providers/loader.service';
import { videoResourceModelComponent } from './video-resources-video/video-resources-video.component';

@Component({
  selector: 'app-video-resources',
  templateUrl: './video-resources.component.html',
  styleUrls: ['./video-resources.component.scss']
})
export class VideoResourcesComponent {

  constructor(private loaderService: LoaderService,private dialog: MatDialog) {
    this.loaderService.stopLoader();
  }

  openDialog() {
    const dialogRef = this.dialog.open(videoResourceModelComponent, {disableClose: true, height: '440px', width: '610px',panelClass:'custom-model-box'});    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      // if (sub) {
      //   this.label = "Submitted";
      // } else {
      //   this.label = "Cancelled";
      // }
    })
  }

}
