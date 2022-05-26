import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

@Component({
  selector: 'app-subscription-history',
  templateUrl: './subscription-history.component.html',
  styleUrls: ['./subscription-history.component.scss']
})
export class SubscriptionHistoryComponent implements OnInit {

  userId:any;

  plan:any;

  planDate:any;

  planexpireDate:any;

  loading1:any;

  loading: boolean = false;

  this:any;

  subscriptionData:any = [];

  displayedColumns: string[] = ['dtime', 'payment_method', 'payment_status', 'subscription_status'];

  dataSource = new MatTableDataSource

  @ViewChild(MatPaginator) paginator: MatPaginator;
  plan3: number;

  constructor(private web:WebService,private alert:AlertService,private router:Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId');
    console.log('userId::',this.userId);
    this.getplan(this.userId)
  }

  timeStampToDate(str: any) {    
    return new Date(str );
  }

  openPricing(){
    this.router.navigate(['./pricing']);
  }

  getplan(userId) {
    if(userId){
      this.loading = true;
      this.web.getData('getplanhistory?planDetails_id='+ userId).then((res) => {
        this.loading = false;
        if (res.status == '200') {
          this.plan = res.data;
          console.log('expire data',this.plan3);
          
          this.planexpireDate = this.plan.subscribe_expired_date*1000;
          console.log('planDetails',this.plan);
        }
        else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        this.alert.errorMsg('Connection Error', '');
      });
    }
  }

  ngAfterViewInit() {
    this.plan.paginator = this.paginator;
  }
}
