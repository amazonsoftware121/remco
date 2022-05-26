import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent {
  whyRunContest: any;
  contests: any;
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
    this.getWhyRunContest();
    this.getContests();
    this.getProductFeatures();

  }

  getWhyRunContest() {
    this.web.getData('getAllWhyRunContest').then((res) => {
      if (res.status == '200') {
        this.whyRunContest = res.data.slice(1,5);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getContests() {
    this.web.getData('getAllWhyRunContest').then((res) => {
      if (res.status == '200') {
        this.contests = res.data;
        console.log('plan is', this.contests[0].title);
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
