import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-sweepstakes',
  templateUrl: './sweepstakes.component.html',
  styleUrls: ['./sweepstakes.component.scss']
})
export class SweepstakesComponent {
  
  whyRunSweepStakes: any;
  sweepStakes: any;
  productFeatures: any;
  quesId: any;
  showAns:boolean = false;

  constructor(
    private loaderService: LoaderService,
    private web: WebService,
    private alert: AlertService) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.getWhyRunSweepStakes();
    this.getSweepStakes();
    this.getProductFeatures();

  }

  getWhyRunSweepStakes() {
    this.web.getData('getAllWhyRunSweepStakes').then((res) => {
      if (res.status == '200') {
        this.whyRunSweepStakes = res.data.slice(1,5);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getSweepStakes() {
    this.web.getData('getAllWhyRunSweepStakes').then((res) => {
      if (res.status == '200') {
        this.sweepStakes = res.data;
        console.log('plan is', this.sweepStakes[0].title);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getProductFeatures() {
    this.web.getData('getAllProductsFeatures').then((res) => {
      if (res.status == '200') {
        this.productFeatures = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  openAnswerBox(id) {
    if (this.quesId == id && this.showAns) {
      this.showAns = false;
      this.quesId = id;
    } else {
      this.quesId = id;
      this.showAns = true;
    }
  }
}
