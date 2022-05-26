import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';

@Component({
  selector: 'app-campaign-learn-and-earn-faq',
  templateUrl: './campaign-learn-and-earn-faq.component.html',
  styleUrls: ['./campaign-learn-and-earn-faq.component.scss']
})
export class CampaignLearnAndEarnFaqComponent implements OnInit {

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

  faq_question: any;

  quiz_value: any;
  showSlides: number;
  legnth: any;
  data: any;
  participantsForms: any;
  variable1: any[];
  variable: any[];
  last: any;
  last_value: any;
  countryCode: any;
  learn_winner: any;
  question_legnth: any;

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
    localStorage.setItem('addcreditanswer',this.currentpageUrl)
    this.userId = localStorage.getItem('UserId');
    this.referel_url = ('https://remco.zerosoft.in/web/login/'+this.currentpageUrl);
    this.submissionUrl=('https://remco.zerosoft.in/web/login/'+this.userId);
    this.loaderService.stopLoader();
    this.test=false;
    this.test1=false;
    this.test2=false;
    this.test0=false;
    this.section2=false;
    this.credit_view=false;
  }

  ngOnInit(): void {
    this.formVisiblity(this.activateRoute.params['_value'].id,this.activateRoute.params['_value'].id1);
    this.getAllfaqs();
    // this.getAllcredits();
    this.buildcontactUsForm();
  }

  selectedCode(data) {
    console.log(data);
  }

  getAllfaqs() {
    let id=localStorage.getItem('id');
    let id2=localStorage.getItem('id2'); 
    this.web.getData('getAllfaqs?quiz_id='+ id + '&campany_id='+ id2).then((res) => {
      if (res.status == '200') {
        this.faq_question = res.data;
        this.last=this.faq_question[this.faq_question.length-1];
        this.last_value=this.last.web_id;
        this.question_legnth=this.faq_question.length;
        console.log('..............',this.question_legnth);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  next_quiz(data:any){
    this.userId = localStorage.getItem('UserId');
    let currentpageUrl = localStorage.getItem('addcreditanswer');
    console.log(this.participantsForms.value);
    this.participantsForms.value.userId=this.userId;
    this.participantsForms.value.question_id=data;
    this.participantsForms.value.reference_id=currentpageUrl;
    if (this.participantsForms.valid) {
      this.web.postData('addAnswer', this.participantsForms.value).then((res) => {
        if (res.status == '200') {
          console.log('data is', res);
          this.alert.successMsg(res.error, '');
        } else {
          this.alert.errorMsg(res.error, '');
        }
      }, err => {
        console.log(err);
        this.alert.errorMsg('Connection Error', '');
      });
    } else {
      this.alert.warningMsg('Check if all fields are filled properly and then try', '');
    }
  }

  onSubmit(data:any){
    console.log(this.participantsForms.value);
    this.userId = localStorage.getItem('UserId');
    let currentpageUrl = localStorage.getItem('addcreditanswer');
    console.log(this.participantsForms.value);
    this.participantsForms.value.userId=this.userId;
    this.participantsForms.value.question_id=data;
    this.participantsForms.value.reference_id=currentpageUrl;
    this.participantsForms.value.question_legnth=this.question_legnth;
    if (this.participantsForms.valid) {
      this.web.postData('addAnswer', this.participantsForms.value).then((res) => {
        if (res.status == '200') {
          console.log('data is', res);
          this.alert.successMsg(res.error, '');
          let id=localStorage.getItem('id');
          let id1=localStorage.getItem('id1');
          let id2=localStorage.getItem('id2');
          let refers=localStorage.getItem('ref_current_url');
          this.router.navigate(['./contest-view-entry',id,id1,id2,refers]);
        } else {
          this.alert.errorMsg(res.error, '');
        }
      }, err => {
        console.log(err);
        this.alert.errorMsg('Connection Error', '');
      });
    } else {
      this.alert.warningMsg('Check if all fields are filled properly and then try', '');
    }
  }

  buildcontactUsForm() {
    this.participantsForms = new FormGroup({
      faq_answer: new FormControl('', [Validators.required]),
    });
  }

  productOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-arrow-left btn11 btn-gradient btn-radius" aria-hidden="true"></i>',
      '<button class="btn11 btn-gradient btn-radius" aria-hidden="true">Next</button>'
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
    },
  }

  formVisiblity(id,id1) {
    console.log('CA',id1);
    this.web.getData('getAllCompaniesId?web_id='+ id + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        this.view = res.data[0];
        this.fb_url=this.view.company_facebook_url;
        this.insta_url=this.view.company_instagram_url;
        console.log('insta_url',this.insta_url);
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
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

}
