import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-learn-and-earn',
  templateUrl: './learn-and-earn.component.html',
  styleUrls: ['./learn-and-earn.component.scss']
})
export class LearnAndEarnComponent {
  whyRunLearnAndEarn: any;
  learnAndEarn: any;
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
    this.getWhyRunLearnAndEarn();
    this.getLearnAndEarn();
    this.getProductFeatures();

  }

  getWhyRunLearnAndEarn() {
    this.web.getData('getAllWhyRunLearnAndEarn').then((res) => {
      if (res.status == '200') {
        this.whyRunLearnAndEarn = res.data.slice(1,5);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getLearnAndEarn() {
    this.web.getData('getAllWhyRunLearnAndEarn').then((res) => {
      if (res.status == '200') {
        this.learnAndEarn = res.data;
        console.log('plan is', this.learnAndEarn[0].title);
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
