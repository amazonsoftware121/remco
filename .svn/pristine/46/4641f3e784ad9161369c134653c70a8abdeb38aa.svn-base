import { Route } from '@angular/compiler/src/core';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { AlertService } from 'src/app/providers/alertService';
import { CommonService } from 'src/app/providers/common.service';
import { WebService } from 'src/app/providers/web.serivce';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class paymentComponent implements OnInit {
  
  public payPalConfig?: IPayPalConfig;

  userDetails:any = {'user_first_name':''};

  loading:boolean;

  plan:any;
  paymentMethod: string;
  email: any;

  constructor(private dialog: MatDialogRef<paymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private web:WebService,
    private alert:AlertService,
    private common:CommonService,
    )
  { 
    this.paymentMethod="paypal";
  }

  close() {
    this.dialog.close();
  }

  ngOnInit(): void {
    this.initConfig();
    
}

private initConfig(): void {
  let that = this;
  this.payPalConfig = {
  clientId: "ASI16xTJ_KtM1oEzlqy0AtBOxboqVfb9kpNROIAoQVtqPfwjmUiW_z3o0DpSyvKhQb150Xd5csMA2RtF",
  currency: 'USD',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: "0.09",
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: "0.09",
            }
          }
        }
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical',
  },
  onApprove: (data, actions) => {
    console.log('this.userDetails :>> ', this.userDetails);
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then(details => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
      that.callbackPaypal(details);
    });
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}

callbackPaypal(details:any={}){
  let payData = {
    userId:localStorage.getItem('UserId'),
    payment_method_id: details.id,
    email: this.email.company_email,
    pay_method: this.paymentMethod,
    payment_response: details,
    plan_id: this.plan.web_id,
    user_limit: this.plan.plan_campaign_limit,
  };
  console.log(':---------:>',payData);
  this.loading = true;
  this.web.postData('makePayment1', payData).then(res => {
    this.loading = false;
    if (res.status == '200') {
      this.common.presentToast(res.error);
      // this.dialog.open(RegisterCongratsComponent);
      // this.router.navigate(['../my-account']);
    } else {
      this.common.presentToast(res.error);
    }
  }, err => {
    this.loading = false;
    console.log(err);
    this.common.presentToast('Connection Error',);
  });
}

}