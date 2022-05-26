import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {

  selectedSection: string = 'my-profile';

  constructor(
    private loaderService: LoaderService,

  ) {
    this.loaderService.stopLoader();
  }

  sideBarChange(event: any) {
    this.selectedSection = event;
  }
  

}
