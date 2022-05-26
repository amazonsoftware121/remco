import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { CampaignCompaniesDetailesComponent } from '../campaign-contest-detailes/campaign-contest-detailes.component';
import referralCodeGenerator from 'referral-code-generator'
import { participateRigister } from '../partcipate-register/partcipate-register.component';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-campaign-contest',
  templateUrl: './campaign-contest.component.html',
  styleUrls: ['./campaign-contest.component.scss']
})
export class CampaignCompaniesComponent implements OnInit {

  base_url: string = environment.base_url;

  title = "Animated Count";

  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;

  Companies: any;

  label: any;

  value = "hlo";

  type= "campaign";

  fields:any

  length = 100;

  pageSize = 10;

  pageSizeOptions = [5, 10, 25, 100];

  CompaniesView: any;
  allCompaniesDetailes: any;
  CompaniesContest: any;
  refer: any;
  user_id: any;
  CurrentUsedPageUrl: string;
  SubmissionUsedUrl: string;
  url: any;
  existUserRef: any;
  existUsersub: string;
  restriction_campaign_id: any;
  userType: string | null;
  pageEvent: PageEvent;
  start:any=0;
  end:any=10
  News: any;
  contest: any;
  fetchingStatus: boolean = true;
  contestCount: any;
  total_count: any;
  varifyForm: any;
  close:boolean=true;
  playerName: any;

  constructor(private loaderService: LoaderService, private elRef: ElementRef, private web: WebService,
    private alert: AlertService, private router: Router, private dialog: MatDialog,private activateRoute:ActivatedRoute) {
    this.loaderService.stopLoader();
    this.getContestCount();
    this.close=false;
  }


  ngOnInit(): void {
    this.getCompanies();
    this.companiesDetails();
    if(this.start==0){
      this.start+=0;
      this.end+=6;  
      this.getData();
      this.verificationForm();
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
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
  this.web.getData('getevents?start='+this.start+'&end='+this.end+'&type='+'Contest').then((res)=>{
    if(res.status =='200'){
      this.contest=res.data
        console.log(this.contest);
        
      // }
    }else{
    }
  },err=>{
    console.log(err);
    this.alert.errorMsg('Connection Error', '');
  })
}

getContestCount() {
  this.web.getData('getContestCount').then((res) => {
    if (res.status == '200') {
      this.contestCount = res.data[0];
      this.total_count=this.contestCount.Count_1;
      console.log('plan is', this.total_count);
    } else {
      this.alert.errorMsg(res.error, '');
    }
  }, err => {
    console.log(err);
    this.alert.errorMsg('Connection Error', '');
  });
}

  // getContestCount(){
  //   this.web.getData('getContestCount').then((res)=>{
  //     if(res.result=='200'){
  //       this.contestCount=res.data
  //       console.log('count',this.contestCount);
  //     }else{
  //       this.alert.errorMsg(res.error,'');
  //     }
  //   },err=>{
  //     console.log(err);
  //     this.alert.errorMsg('Connection error','');
  //   })
  // }

  getCompanies() {
    this.web.getData('getAllCompanyContests').then((res) => {
      if (res.status == '200') {
        this.Companies = res.data;
        console.log('campaign company',this.Companies);
        
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  closes(){
    this.getData();
    this.close=false;
  }

  verificationForm() {
    this.varifyForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  search(){
    console.log(this.playerName)
    let data={
      search_value:this.playerName
    }
    this.web.postData('serachResult',data).then((res)=>{
      if(res.status='200'){
        this.close=true;
        this.contest=res.data;

      }else{
          // this.alert.errorMsg('', res.error);
        }
    })

  }

  async openPageView(data:any){
    let user_id=localStorage.getItem('UserId')
    this.userType = localStorage.getItem('Role');
    if(user_id==null || this.userType=='Company'){
      console.log('if works');
      this.dialog.open(participateRigister, {data:this.userType,disableClose: true, height: '220px', width: '500px' });
    }else{
    let user_random_key=localStorage.getItem('user_random_key')
   await this.web.getData('getActiveId?company_id='+ user_id + '&random_key='+data.web_id).then((res) => {
      if (res.status == '200') {
        this.user_id = res.data[0];
        console.log('@@@@@@@@@@@@@@@@@@@@',this.user_id.campaign_company_id);
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
    this.refer=referralCodeGenerator.custom('alphanumeric',4, 6,'reference');
    localStorage.setItem('reference',this.refer);
    let refer=localStorage.getItem('reference');
    if(data.company_contest_form_visibility == 'Fullpage'){
      let user_id=localStorage.getItem('UserId')
      let user_id1=localStorage.getItem('user_idss')
      let user_random_key=localStorage.getItem('user_random_key')
      if(user_id===user_id1 && data.web_id===this.restriction_campaign_id){
        this.existUserRef = ('https://remco.zerosoft.in/web/login/'+ user_random_key);
        this.existUsersub = ('https://remco.zerosoft.in/web/login/'+ user_id);
        localStorage.setItem('existUserRef',this.existUserRef);
        localStorage.setItem('existUsersub',this.existUsersub);
        this.router.navigate(['/contest-view-entry', data.web_id,data.campaign_type,data.company_contest_id,user_random_key]);
        console.log('entry view');
        
      }else{
        console.log('full view');
      this.router.navigate(['/campaign-full-view', data.web_id,data.campaign_type,data.company_contest_id,refer]);
      }
    }else if(data.company_contest_form_visibility == 'Widget'){
      this.router.navigate(['/campaign-widget-view', data.web_id,data.campaign_type,data.company_contest_id]);
    }else{
      this.router.navigate(['/campaign-lightbox-view', data.web_id,data.campaign_type,data.company_contest_id]);
    }
  }
  }

  companiesDetails() {
    this.web.getData('getAllCompanies?web_id').then((res) => {
      if (res.status == '200') {
        this.allCompaniesDetailes = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  winnerAnnounce(){
    let userId = localStorage.getItem('UserId');
    this.web.getData('winnerAnnounce?web_id='+ userId).then((res) => {
      if (res.status == '200') {
        this.url = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
    });
  }

  openDialog(data1:any) {
    data1.companiesDetailes = this.allCompaniesDetailes;
    const dialogRef = this.dialog.open(CampaignCompaniesDetailesComponent, { data: data1, disableClose: true, height: '310px', width: '800px' });
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
