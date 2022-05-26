import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { CampaignCompaniesDetailesComponent } from '../campaign-contest-detailes/campaign-contest-detailes.component';
import referralCodeGenerator from 'referral-code-generator'
import { participateRigister } from '../partcipate-register/partcipate-register.component';


@Component({
  selector: 'app-campaign-sweep-stakes',
  templateUrl: './campaign-sweep-stakes.component.html',
  styleUrls: ['./campaign-sweep-stakes.component.scss']
})
export class CampaignSweepStakesComponent implements OnInit {

  base_url:string = environment.base_url;

  title = "Animated Count";

  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;

  Companies: any;

  label: any;

  value= "hlo";
  allCompaniesDetailes: any;
  refer: any;
  user_id: any;
  restriction_campaign_id: any;
  existUserRef: string;
  existUsersub: string;
  user: any;
  userType: string | null;
  start:any=0;
  end:any=10
  sweep: any;

  constructor(private loaderService: LoaderService,private elRef: ElementRef, private web: WebService,
    private alert: AlertService,private router:Router, private dialog: MatDialog) {
    this.loaderService.stopLoader();

   }

  ngOnInit(): void {
    this.getCompanies();
    if(this.start==0){
      this.start+=0;
      this.end+=6;  
      this.getData();
    }
  }

  onPaginateChange(event){
    // alert(JSON.stringify("Current page index: " + event.pageIndex));
    console.log('page change');
    this.start+=6;
    this.end+=6;
    this.getData();
    
  }

  onPaginateChangeDecrease(event){
    // alert(JSON.stringify("Current page index: " + event.pageIndex));
    if(this.start!=0){
    console.log('page change');
    this.start-=6;
    this.end-=6;
    this.getData();
    }
  }

  getData(){
    this.web.getData('getevents?start='+this.start+'&end='+this.end+'&type='+'Sweep').then((res)=>{
      if(res.status =='200'){
        this.sweep=res.data
          console.log(this.sweep);
          
        // }
      }else{
      }
    },err=>{
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    })
  }

  getCompanies() {
    this.web.getData('getAllCompanySweepStakes').then((res) => {
      if (res.status == '200') {
        this.Companies = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  async openPageView(data: any){
    let user_id=localStorage.getItem('UserId')
    this.userType = localStorage.getItem('Role');
    if(user_id==null || this.userType=='Company'){
      console.log('if works');
      this.dialog.open(participateRigister, {data:this.userType,disableClose: true, height: '220px', width: '500px' });
    }else{
      console.log('else works');
    let user_random_key=localStorage.getItem('user_random_key')
    await this.web.getData('getActiveIdSweep?company_id='+ user_id + '&random_key='+data.web_id).then((res) => {
      if (res.status == '200') {
        this.user_id = res.data[0];
        console.log('@@@@@@@@@@@@@@@@@@@@',this.user_id.campaign_id);
        this.restriction_campaign_id=this.user_id.campaign_id;
        localStorage.setItem('restriction_campaign_id',this.user_id.campaign_id);
        localStorage.setItem('user_idss',this.user_id.campaign_participant_id);
        localStorage.setItem('user_random_key',this.user_id.user_random_key);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
    console.log('clickeble id',data.web_id);
    this.refer=referralCodeGenerator.custom('alphanumeric',4, 6,'reference');
    localStorage.setItem('learn_reference',this.refer);
    let refer=localStorage.getItem('learn_reference');
    if(data.company_sweep_form_visibility == 'Fullpage'){
      let user_id=localStorage.getItem('UserId')
      let user_id1=localStorage.getItem('user_idss')
      let user_random_key=localStorage.getItem('user_random_key')
      if(user_id===user_id1 && data.web_id === this.restriction_campaign_id){
        this.existUserRef = ('https://remco.zerosoft.in/web/login/'+ user_random_key);
        this.existUsersub = ('https://remco.zerosoft.in/web/login/'+ user_id);
        localStorage.setItem('existUserRef',this.existUserRef);
        localStorage.setItem('existUsersub',this.existUsersub);
        console.log('entry view');
        this.router.navigate(['/contest-view-entry', data.web_id,data.campaign_type,data.company_sweepstakes_id,user_random_key]);
      }else{
        console.log('full view');
        this.router.navigate(['/campaign-full-view',data.web_id,data.campaign_type,data.company_sweepstakes_id,refer]);
      }
    }else if(data.company_sweep_form_visibility == 'Widget'){
      this.router.navigate(['/campaign-widget-view',data.web_id,data.campaign_type,data.company_sweepstakes_id]);
    }else{
      this.router.navigate(['/campaign-lightbox-view',data.web_id,data.campaign_type,data.company_sweepstakes_id]);
    }
  }
  }

  companiesDetails() {
    this.web.getData('getAllCompanies?web_id').then((res) => {
      if (res.status == '200') {
        this.allCompaniesDetailes = res.data1;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  openDialog(data1){
    const dialogRef = this.dialog.open(CampaignCompaniesDetailesComponent, {data: data1, disableClose: true,height:'310px',width:'800px'});
    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      if (sub) {
        this.label = "Submitted";
      } else {
        this.label = "Cancelled";
      }
    })
  }

  

}
