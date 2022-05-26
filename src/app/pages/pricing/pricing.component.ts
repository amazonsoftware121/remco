import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../providers/loader.service';
import { WebService } from '../../providers/web.serivce';
import { AlertService } from '../../providers/alertService';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { paymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  plans: any;

  constructor(
    private loaderService: LoaderService,
    private web: WebService,
    private alert: AlertService,
    private router :Router,
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.getAllPlan();
  }

  buy(data){
    this.router.navigate(['/subscription',data.web_id]);
  }

  getAllPlan() {
    this.web.getData('getAllPlan').then((res) => {
      if (res.status == '200') {
        this.plans = res.data;
        console.log('plan is', this.plans);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

}
