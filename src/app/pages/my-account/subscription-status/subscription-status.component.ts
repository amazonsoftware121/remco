import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { CommonService } from 'src/app/providers/common.service';
import { WebService } from 'src/app/providers/web.serivce';

@Component({
  selector: 'app-subscription-status',
  templateUrl: './subscription-status.component.html',
  styleUrls: ['./subscription-status.component.scss']
})
export class SubscriptionStatusComponent implements OnInit {
  canceledplan: any;

  openDialog(userId:any,msg:any,cForType:any) {
    let dialogRef = this.dialog.open(Confirmation);
    dialogRef.componentInstance.userId=userId;
    dialogRef.componentInstance.msg=msg;
    dialogRef.componentInstance.cForType=cForType;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  } 

  plan:any;

  userId:any;
  planDate: any;
  planexpireDate: number;
  loading: boolean = false;

  constructor(
    private web:WebService,
    private alert: AlertService,
    private dialog:MatDialog,
    private router :Router
  ) {
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId');
    console.log('userId::',this.userId);
    this.getplan(this.userId)
    this.getcancelplandetails(this.userId)
  }

  openPricing(){
    this.router.navigate(['./pricing']);
  }

  getplan(userId) {
    if(userId){
      this.loading = true;
      this.web.getData('getplandetails?planDetails_id='+ userId).then((res) => {
        this.loading = false;
        if (res.status == '200') {
          this.plan = res.data[0];
          this.planDate = this.plan.subscribe_date*1000;
          this.planexpireDate = this.plan.subscribe_expired_date*1000;
          console.log('planDetails',this.plan);
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        this.alert.errorMsg('Connection Error', '');
      });
    }
  }

  getcancelplandetails(userId) {
    if(userId){
      this.loading = true;
      this.web.getData('getcancelplandetails?planDetails_id='+ userId).then((res) => {
        this.loading = false;
        if (res.status == '200') {
          this.canceledplan = res.data[0];
          console.log('cancelplanDetails',this.plan);
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        this.alert.errorMsg('Connection Error', '');
      });
    }
  }

  openModal(){
    let id = localStorage.getItem('UserId');
    this.openDialog(id,"Do you really want to cancel subscription?","Cancel");
  }

}

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class Confirmation {
  userId:any;
  msg:any;
  cForType:any;
  loading:boolean;
  constructor(public dialogRef: MatDialogRef<Confirmation>,
              private web: WebService,
              public common: CommonService) {

  }

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnInit(){

  }
  onClose(){
this.dialogRef.close();
  }

  onSuccess(){
    this.cForType=="cancel";
    // let urlPath=(this.cForType=="Cancel")?"cancelSubscription":"reactivateSubscription";
    this.loading = true;
    this.web.postData('cancelSubscription',{"user_id":this.userId}).then(res => {
      this.loading = false;
      if (res.status == 'success') {
        this.common.presentToast(res.msg);
        this.closeDialog();
      } else{
        // this.common.presentToast(res.msg);
      }
    }, err => {
      this.loading = false;
      this.common.presentToast('connection error','');
    });
  }
}
