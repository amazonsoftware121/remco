import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { AlertService } from 'src/app/providers/alertService';
import { CommonService } from 'src/app/providers/common.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../providers/loader.service';
import { RegisterCongratsComponent } from './register-congrats/register-congrats.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class subscriptionComponent {

  public payPalConfig?: IPayPalConfig;
  paymentMethod:any;
  plan :any;
  registerResponse: any = {};
  loading:boolean;
  userDetails:any = {'user_first_name':''};
  showSuccess:boolean;
  email: any;
  console: number;
  paypal: any;
  timer:any;

  constructor(private loaderService: LoaderService,
    private activateRoute:ActivatedRoute,
    private web:WebService,
    private alert:AlertService,
    private common:CommonService,
    private router: Router,
    private dialog:MatDialog,
    ) {
    this.paymentMethod="paypal";
    this.loaderService.stopLoader();
  }

  ngOnInit(){
    this.getplan(this.activateRoute.params['_value'].id)
    this.getemail();
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
            value: this.plan.console,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.plan.console,
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
        this.dialog.open(RegisterCongratsComponent);
        this.timer = setInterval(()=>{
          this.router.navigate(['./my-account']);
        }, 1000);
      } else {
        this.common.presentToast(res.error);
      }
    }, err => {
      this.loading = false;
      console.log(err);
      this.common.presentToast('Connection Error',);
    });
  }

  getplan(id) {
    this.web.getData('getplan?plan_id='+ id).then((res) => {
      if (res.status == '200') {
        this.plan = res.data[0];
        this.plan.console = this.plan.plan_campaign_limit*this.plan.plan_amount;
        console.log('........',this.plan.console);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getemail() {
    let userId = localStorage.getItem('UserId');
    this.web.getData('getEmail?company_id='+ userId).then((res) => {
      if (res.status == '200') {
        this.email = res.data[0];
        console.log('email',this.email);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  // onPay(){
  //   let userId = localStorage.getItem('UserId');
  //   this.plan.companyId = userId;
  //   this.web.postData('pay', this.plan).then((res) => {
  //     if (res.status == '200') {
  //       console.log('data is', res);
  //       this.alert.successMsg(res.error, '');
  //     } else {
  //       this.alert.errorMsg(res.error, '');
  //     }
  //   }, err => {
  //     console.log(err);
  //     this.alert.errorMsg('Connection Error', '');
  //   });
  // }

}
