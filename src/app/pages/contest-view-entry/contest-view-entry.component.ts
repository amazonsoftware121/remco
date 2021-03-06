import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';
import { ContestFullviewGallaryVoteComponent } from '../contest-fullview-gallary/contest-fullview-gallary-vote/contest-fullview-gallary-vote.component';



@Component({
  selector: 'app-contest-view-entry',
  templateUrl: './contest-view-entry.component.html',
  styleUrls: ['./contest-view-entry.component.scss']
})
export class ContestViewEntryComponent implements OnInit {

  base_url:string = environment.base_url;

  test:boolean=true;

  code:any;

  referel_url: any;

  submission_url: any;

  view: any;

  countDownDate: number;

  demo: string;

  mail: any;

  label: string;

  test1:boolean=true

  test2:boolean=true

  test0:boolean=true

  url: any;

  section1:boolean=true

  credit_view:boolean=true;

  section2:boolean=true
  image: any;
  userData2: string;
  splite: any;
  splite_url: any;
  userId: string | null;
  submissionUrl: string;
  currentpageUrl: string;
  credit: any;
  total_credit: any;
  fb_url: any;
  insta_url: any;
  campaign_type: any;
  faq_question: any;
  last: any;
  last_value: any;
  faq_answers: any;
  tests='1';
  total_credit_learn: any;
  credit_learn: any;
  selected_answer: any;
  learn_winner: any;
  pre: any;
  length: any;
  Array: any;
  rewards: any;
  total_rewards: any;
  reward_price: any;
  price: any;
  web_id: any;
  loading: boolean=false;
  submission_image: any;
  live: any;

  constructor(
    private loaderService: LoaderService,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private web:WebService,
    private alert:AlertService,
    private dialog: MatDialog,
  ) { 
    this.userData2=window.location.href;
    this.splite=this.userData2.split('/');
    this.currentpageUrl=this.splite[8];
    console.log('-',this.currentpageUrl);
    localStorage.setItem('param_current_value',this.currentpageUrl);
    this.userId = localStorage.getItem('submission_id');
    this.referel_url = ('https://remco.zerosoft.in/web/login/'+this.currentpageUrl);
    this.submissionUrl=('https://remco.zerosoft.in/web/login/'+this.userId);
    console.log('----------00000>>>',this.submissionUrl);
    
    this.loaderService.stopLoader();
    this.test=false;
    this.test1=false;
    this.test2=false;
    this.test0=false;
    this.section2=false;
    this.credit_view=false;
    this.formVisiblity(this.activateRoute.params['_value'].id,this.activateRoute.params['_value'].id1);
    this.getAllcredits();
    if(this.credit){
      location.reload();
      this.total_credit=this.credit.reference_credits;
      this.total_rewards=this.total_credit*this.price;
    }
  }

  ngAfterViewInit(){
    this.formVisiblity(this.activateRoute.params['_value'].id,this.activateRoute.params['_value'].id1);
    this.getAllcredits();
      this.total_credit=this.credit.reference_credits;
      this.total_rewards=this.total_credit*this.price;
  }

  ngOnInit(): void {
    this.learnwinnerAnnounce();
    this.getEmail(this.activateRoute.params['_value'].id2);
    this.getAllimages();
    this.getAllfaqs();
    this.getAllAnswers();
  }

  openVoting(data:any) {
    data.web_id=data.web_id;
    data.campaign_id=this.view.web_id;
    console.log('data',data);
    const dialogRef = this.dialog.open(ContestFullviewGallaryVoteComponent, { data: data, disableClose: true, height: '90%', width: '50%',panelClass:'custom-model-box'});    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      if (sub) {
        this.label = "Submitted";
      } else {
        this.label = "Cancelled";
      }
    })
  }

  view_credit(){
    this.credit_view=!this.credit_view  
  }

  testClick(){
    this.test=!this.test;
    this.test1=false;
    this.test2=false;
    this.test0=false;
  }
  testClick1(){
    this.test=false;
    this.test1=!this.test1;
    this.test2=false;
    this.test0=false;
  }
  testClick2(){
    this.test=false;
    this.test2=!this.test2;
    this.test1=false;
    this.test0=false;
  }

  testClick0(){
    this.test0=!this.test0;
    this.test=false;
    this.test2=false;
    this.test1=false;
  }

  copy(){
    this.alert.successMsg('Copied', '');
  }

  getAllfaqs() {
    let id=localStorage.getItem('id');
    let id2=localStorage.getItem('id2'); 
    this.web.getData('getAllfaqs?quiz_id='+ id + '&campany_id='+ id2).then((res) => {
      if (res.status == '200') {
        this.faq_question = res.data;
        this.last=this.faq_question[this.faq_question.length-1];
        this.last_value=this.last.web_id;
        localStorage.setItem('web_id',this.last_value);
        console.log('..............',this.last_value);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getAllAnswers() {
    let userId = localStorage.getItem('UserId');
    let web = localStorage.getItem('web_id');
    this.web.getData('getAllAnswers?quiz_id='+ web + '&campany_id='+ userId).then((res) => {
      if (res.status == '200') {
        this.faq_answers= res.data;
        console.log('-------',this.faq_answers[0].faq_answer);
        console.log('-------',this.faq_answers[0].learn_question_option1);
        console.log('-------',this.faq_answers[0].learn_question_option2);
        console.log('-------',this.faq_answers[0].learn_question_option3);
        console.log('-------',this.faq_answers[0].learn_question_option4);
        this.Array=this.faq_answers.concat(this.faq_question);
        console.log('array',this.Array);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  formVisiblity(id,id1) {
    console.log('CA',id1);
    this.web.getData('getAllCompaniesId?web_id='+ id + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        this.view = res.data[0];
        localStorage.setItem('view_web_id',this.view.web_id);
        console.log('total reward',this.view);
        this.rewards=this.view.company_reward_price;
        this.reward_price=this.rewards.split('$');
        this.price=this.reward_price[1];
        this.live=this.view.campaign_type;
        console.log('Ca1n14a1n14t8h6i0A',this.price);
        this.campaign_type=this.view.campaign_type;
        localStorage.setItem('campaigntype1',this.campaign_type)
        this.fb_url=this.view.company_facebook_url;
        this.insta_url=this.view.company_instagram_url;
        console.log('insta_url',this.campaign_type);
        console.log('fb_url',this.fb_url);
        this.view.company_start_date = this.view.company_start_date *1000;
        this.view.company_end_date = this.view.company_end_date *1000;
        this.countDownDate = new Date(this.view.company_end_date).getTime();
        let x = setInterval(()=>{
          var now = new Date().getTime();
          var distance = this.countDownDate - now;
          var days = Math.floor(distance/(1000*60*60*24));
          var hour = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
          var minute = Math.floor((distance % (1000*60*60))/ (1000*60));
          var seconds = Math.floor((distance % (1000*60)) / 1000);
          this.demo = days + "d  " + hour +"h  " + minute +"m  " + seconds + "s  ";
        });
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getAllimages() {
    this.web_id=localStorage.getItem('view_web_id');
    console.log('this.view.web_id',this.web_id);
    this.web.getData('getAllimages?web_id='+this.web_id).then((res) => {
      if (res.status == '200') {
        this.image = res.data;
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  } 

  getEmail(id2) {
    localStorage.setItem('id2',id2);
    this.web.getData('getEmail?company_id='+ id2).then((res) => {
      if (res.status == '200') {
        this.mail = res.data[0];
        console.log('MAIL',this.mail);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  openDialog(data1:any) {
    data1.rules=this.view.company_official_rules;
    data1.post_comment=this.view.company_post_comment;
    const dialogRef = this.dialog.open(CampaignRules, { data: data1, disableClose: true, height: '300px', width: '600px' });
    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      if (sub) {
        this.label = "Submitted";
      } else {
        this.label = "Cancelled";
      }
    })
  }

  gallery(){
    this.section2=true;
    this.section1=false;
  }

  close_gallery(){
    this.section2=false;
    this.section1=true;
  }

  learnwinnerAnnounce(){
    let userId = localStorage.getItem('UserId');
    this.web.getData('learnwinnerAnnounce?web_id='+ userId).then((res) => {
      if (res.status == '200') {
        this.learn_winner = res.data;
      } else {
      }
    }, err => {
    });
  }

  getSubmissionImage(){
    this.web_id=localStorage.getItem('view_web_id');
    let data={
      get_submission_image:this.currentpageUrl,
      campaign_id:this.web_id
    }
    this.web.postData('getSubmissionImage',data).then((res)=>{
      if(res.status='200'){
        this.submission_image=res.data;
      }else{
          this.loading = false;
          // this.alert.errorMsg('', res.error);
        }
    })
  }

  exit(){
    if(this.live=='contest'){
      this.router.navigate(['./campaign-contest']);
    }else if(this.live=='learn'){
      this.router.navigate(['./campaign-learn-and-earn']);
    }else{
      this.router.navigate(['./campaign-sweep-stakes']);
    }
  }

  getAllcredits() {
    let campaign_type=localStorage.getItem('campaigntype1');
    let refer=localStorage.getItem('param_current_value');
    console.log('localstorage',campaign_type);
    let userId = localStorage.getItem('UserId');
    this.web.getData('getAllcredits?credit_id='+userId + '&campaign_type='+ campaign_type + '&referal_code='+refer).then((res) => {
      if (res.status == '200') {
        this.credit = res.data[0];
        console.log(this.credit.insta_creditted);
        this.total_credit=this.credit.reference_credits;
        this.total_rewards=this.total_credit*this.price;
        console.log('total credits',this.total_rewards);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      // this.alert.errorMsg('Connection Error', '');
    });
  }

  getAllcreditsLearn() {
    let userId = localStorage.getItem('UserId');
    this.web.getData('getAllcreditsLearn?credit_id='+userId).then((res) => {
      if (res.status == '200') {
        this.credit_learn = res.data[0];
        console.log(this.credit.insta_creditted);
        this.total_credit_learn=this.credit_learn.reference_credits;
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  instacredit(){
    console.log('works');
    
    if(this.credit.insta_creditted=='0'){
      console.log('if works');
      
    let refer=localStorage.getItem('param_current_value');
    console.log(refer);
    
    let campaign_type=localStorage.getItem('campaigntype1');
    console.log('localstorage',campaign_type);
    this.web.getData('addinstacredits?web_id='+ refer + '&campaign_type='+ campaign_type).then((res) => {
      if (res.status == '200') {
        this.url = res.data;
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      // this.alert.errorMsg('Connection Error', '');
    });
  }
  }

  facecredit() {
    if(this.credit.fb_creditted=='0'){
      console.log('fb credit works');
      let refer=localStorage.getItem('param_current_value');
      let campaign_type=localStorage.getItem('campaigntype1');
      console.log('localstorage',campaign_type);
      this.web.getData('addfbcredits?web_id='+ refer + '&campaign_type='+ campaign_type).then((res) => {
        if (res.status == '200') {
          this.url = res.data;
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        // this.alert.errorMsg('Connection Error', '');
      });
    }
  }

  fb(e) {
    let url = 'www.google.com';
    e.preventDefault();
    var facebookWindow = window.open(
      'https://www.facebook.com/sharer/sharer.php?u='+ 'Use Referral code ->to join the newest fantasy sports platform Earn extra points along with lots of exciting prizes. Don???t delay, join the match today! url',
      'facebook-popup',
      'height=350,width=600'
    );
    // if (facebookWindow.focus) {
    //   facebookWindow.focus();
    // }
    return false;
  }

}
