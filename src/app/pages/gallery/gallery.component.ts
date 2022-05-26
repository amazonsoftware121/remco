import { Component } from '@angular/core';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  constructor(private loaderService: LoaderService) {
    this.loaderService.stopLoader();
  }

}
