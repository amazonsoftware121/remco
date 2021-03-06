import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import countriesCode from 'src/assets/countries.json'
import { CommonService } from 'src/app/providers/common.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';
import { Observable, timer } from 'rxjs';
import referralCodeGenerator from 'referral-code-generator'
import { DatePipe } from '@angular/common';

import social from "src/assets/social.json";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const counter = timer(0, 1000);

@Component({
  selector: 'app-campaign-full-view',
  templateUrl: './campaign-full-view.component.html',
  styleUrls: ['./campaign-full-view.component.scss']
})
export class CompanyContestComponent implements OnInit {

  divs: number[] = [];

  divss: number[] = [];

  variables=[];

  public clock;

  participantsForms:any;
  
  contactUsForm: any;
  
  view :any
  
  type:any=[];

  type1:any=[];

  type2:any=[];

  type3:any=[];
  
  view1:any
  
  preEntry:any

  base_url:string = environment.base_url;

  fields:any

  countries: any = countriesCode;

  countryCode: any;

  country :any

  participantsData :any

  mail :any;

  div1:boolean=true;

  div2:boolean=true;

  div3:boolean=true;

  div11:boolean=true;

  div12:boolean=true;

  div13:boolean=true;

  div4:boolean=true;

  div14:boolean=true;

  div5:boolean=true;

  div22:boolean=true;

  div23:boolean=true;

  div24:boolean=true;

  div21:boolean=true;

  div6:boolean=true;

  section1:boolean=true;

  section2:boolean=true;

  test:boolean=true

  test1:boolean=true

  test2:boolean=true

  test0:boolean=true

  testimonialOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:1800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      }
    },
  }
  postdata: any;
  participant_id: string | null;
  company_id: any;
  contest_id: any;
  label: string;
  dateTime: Date;
  result: number;
  countDownDate: any;
  demo:any;
  loading: boolean=false;
  dialogData: any;
  profile: string;
  socialLink: any = social;
  btn1: any;
  btn2: any;
  profile1: string;
  btn3: any;
  profile2: string;
  photo_video1: any;
  photo_video2: any;
  photo_video3: any;
  numbers: any;
  filenameList:any = [];
  selectedFiles:any = [];
  variable:any =[];
  variable1:any =[];
  variable2:any =[];
  variable3:any =[];
  type4: any;
  refer:any;
  userData: any;
  currentpageUrl: string;
  submissionUrl: string;
  url: any;
  userData1: string;
  splite: string[];
  splite_url: string;
  ententionName: string | undefined;
  live: any;
  safeSrc: SafeResourceUrl;
  reward_price: any;
  submission: any;
  constructor(
    private datepipe :DatePipe,
    public common: CommonService,
    private loaderService: LoaderService,
    private activateRoute:ActivatedRoute,
    private web:WebService,
    private alert:AlertService,
    private dialog: MatDialog,
    private router:Router,
    private sanitizer: DomSanitizer
    // shareButtons: ShareButtons
    ) {
    this.userData1=window.location.href;
    this.splite=this.userData1.split('/');
    this.splite_url=this.splite[8];
    localStorage.setItem('ref_current_url',this.splite_url);
    this.loaderService.stopLoader();
    this.div2=false;
    this.div3=false;
    this.div12=false;
    this.div13=false;
    this.div4=false;
    this.div14=false;
    this.div22=false;
    this.div23=false;
    this.div24=false;
    this.section2=false;
    this.test=false;
    this.test1=false;
    this.test2=false;
    this.test0=false;
    this.div11=false;
    this.div21=false;
   }

  ngOnInit(): void {
    this.formVisiblity(this.activateRoute.params['_value'].id,this.activateRoute.params['_value'].id1);
    this.preEntryForm(this.activateRoute.params['_value'].id2,this.activateRoute.params['_value'].id1);
    this.getEmail(this.activateRoute.params['_value'].id2);
    
    this.buildcontactUsForm();
    this.testFunction();
  }

  div2Function(){
    this.div2=true;
    this.div3=false;
    this.div1=false;
    this.div4=true;
}

  div3Function(){
    this.div3=true;
    this.div2=false;
    this.div1=false;
    this.div4=true;
}
div1Function(){
  this.div1=true;
  this.div2=false;
  this.div3=false;
  this.div4=false;
}

div12Function(){
  this.div12=true;
  this.div13=false;
  this.div11=false;
  this.div14=true;
}

div13Function(){
  this.div13=true;
  this.div12=false;
  this.div11=false;
  this.div14=true;
}
div11Function(){
this.div11=true;
this.div12=false;
this.div13=false;
this.div14=false;
}

div22Function(){
  this.div22=true;
  this.div23=false;
  this.div21=false;
  this.div24=true;
}

div23Function(){
  this.div23=true;
  this.div22=false;
  this.div21=false;
  this.div24=true;
}
div21Function(){
this.div21=true;
this.div22=false;
this.div23=false;
this.div24=false;
}

createDiv(): void {
  this.div11=true
  this.div5=false;
}

createDivv(): void {
  this.div21=true
  this.div6=false;
}

  formVisiblity(id,id1) {
    localStorage.setItem('id',id);
    localStorage.setItem('id1',id1);
    this.web.getData('getAllCompaniesId?web_id='+ id + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        // if(this.live==='Live'){
        this.view = res.data[0];
        console.log('reward',this.view);
        this.reward_price=this.view.company_reward_price;
        this.live=this.view.campaign_type;
        this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.view.youtube_video_url);
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
        this.view1 = [
          {
            id: '1',
            image: this.view.company_product_images_slide1
          },
          {
            id: '2',
            image: this.view.company_product_images_slide2
          },
          {
            id: '3',
            image: this.view.company_product_images_slide3
          }
        ]
      // }
      } else {
        this.alert.errorMsg(res.error, '');
      
    }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  testFunction(){
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

  preEntryForm(id2,id1) {
    this.web.getData('getAllCompanyEntryFields?company_id='+ id2 + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        this.fields = res.data[0];
        this.getCountry(this.fields.pre_entry_form_country);
        this.selectedCode(this.fields.pre_entry_form_country);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getEmail(id2) {
    localStorage.setItem('id2',id2);
    this.web.getData('getEmail?company_id='+ id2).then((res) => {
      if (res.status == '200') {
        this.mail = res.data[0];
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  testClick(){
    this.test=true;
    this.test1=false;
    this.test2=false;
    this.test0=false;
  }
  testClick1(){
    this.test=false;
    this.test1=true;
    this.test2=false;
    this.test0=false;
  }
  testClick2(){
    this.test=false;
    this.test2=true;
    this.test1=false;
    this.test0=false;
  }

  testClick0(){
    this.test0=true
    this.test=false;
    this.test2=false;
    this.test1=false;
  }

  section_close(){
    this.div11=false;
    this.div5=true;
  }

  section_close1(){
    this.div21=false
    this.div6=true;
  }

  getCountry(code) {
    countriesCode.find((obj) => {
      if (obj.phonecode === code) {
        this.country = obj.name;
      }
    });
  }

  selectedCode(data) {
    this.countryCode = data;
  }
  selectedCodes(data){}

  buildcontactUsForm() {
    this.participantsForms = new FormGroup({
      pre_entry_form_name: new FormControl('', [Validators.required]),
      pre_entry_form_email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),]),
      pre_entry_form_address: new FormControl('', [Validators.required]),
      pre_entry_form_city: new FormControl('', [Validators.required]),
      pre_entry_form_state: new FormControl('', [Validators.required]),
      pre_entry_form_country: new FormControl('', [Validators.required]),
      pre_entry_form_phone: new FormControl('', [Validators.required]),
      pre_entry_form_birthday: new FormControl('', [Validators.required]),
      pre_entry_form_entry_code: new FormControl('', [Validators.required]),
      contest_photo_video_name1: new FormControl('', [Validators.required]),
      contest_photo_video_url1: new FormControl('', [Validators.required]),
      contest_photo_video_comments1: new FormControl('',[Validators.required]),
      contest_photo_video_name2: new FormControl('', [Validators.required]),
      contest_photo_video_url2: new FormControl('', [Validators.required]),
      contest_photo_video_comments2: new FormControl('',[Validators.required]),
      contest_photo_video_name3: new FormControl('', [Validators.required]),
      contest_photo_video_url3: new FormControl('', [Validators.required]),
      contest_photo_video_comments3: new FormControl('',[Validators.required]),
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

  exit(){
    if(this.live=='contest'){
      this.router.navigate(['./campaign-contest']);
    }else if(this.live=='learn'){
      this.router.navigate(['./campaign-learn-and-earn']);
    }else{
      this.router.navigate(['./campaign-sweep-stakes']);
    }
  }

  onFileChanges(event,category) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.onSubmite(files,category);
    }
  }

  onSubmite(file: any, category:any) {
    let d = new Date();
    let n: any = d.valueOf();
    let fname = file[0].name;
    fname = fname.substring(fname.lastIndexOf('.') + 1, fname.length) || fname;
    let filename = 'Remco_' + n.toString().substring(4, 8) + file[0].name;
    const formData = new FormData();
    formData.append("image", file[0]);
    formData.append("image", filename);
    formData.append("blog_image", filename);
    this.loading = true;
    this.web.uploadWebsitePicture(`${this.base_url}restapi/upload_website_contest_picture.php?filename=`+ filename + `&category=`+ category, formData).subscribe((Res: any) => {
      this.loading = false;
      this.ententionName=filename.split('.').pop();  
      if(this.ententionName=='png' || this.ententionName=='jpg' || this.ententionName=='jpeg'){
      if (Res.status == '200') {
        this.alert.successMsg(Res.error, '');
        if(category === 'btn1'){
          this.participantsForms.contest_photo_video_name1 = filename;
        }else if(category === 'btn2'){
          this.participantsForms.contest_photo_video_name2 = filename;
        }else if(category === 'btn3'){
          this.participantsForms.contest_photo_video_name3 = filename;
        }
      } else {
        this.alert.errorMsg(Res.error, '');
      }
    }else{
      this.alert.errorMsg('Please upload valid images', '');
    }
    }, (err) => {
      this.alert.errorMsg('Connection Error','');
      this.loading = false;
    }); 
  }

  gallery(){
    let userId = localStorage.getItem('UserId');
    this.router.navigate(['./contest-fullview-gallary']);
  }

  validateUrl1(social) {
    var that=this.participantsForms.contest_photo_video_url1;
    // /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi
    var regularExpression = /^(https?:\/\/)?((w{3}\.)?)instagram.com|instagr.am|twitter|youtube(-nocookie)?\.com|youtu.be|facebook.com\/.*/;
    if (!regularExpression.test(social)) {
      return true;
    } else {
      return null;
    }
  }
   
    async onSubmit() {
    let refer=localStorage.getItem('reference');
    // this.web.getData('addcredits?web_id='+ refer + '&campany_type='+ this.live).then((res) => {
    //   if (res.status == '200') {
    //     this.url = res.data;
    //   } else {
    //     // this.alert.errorMsg(res.error, '');
    //   }
    // }, err => {
    //   this.alert.errorMsg('Connection Error', '');
    // });
    if(this.fields.pre_entry_form_name == '1' && (this.participantsForms.pre_entry_form_name == '' || this.participantsForms.pre_entry_form_name == null)){this.common.presentToast('Enter your name');}
    else if(this.fields.pre_entry_form_email == '1' && (this.participantsForms.pre_entry_form_email == '' || this.participantsForms.pre_entry_form_email == null)){this.common.presentToast('Enter your email');}
    else if(this.fields.pre_entry_form_email == '1' && this.common.validateEmail(this.participantsForms.pre_entry_form_email)) {this.common.presentToast('Enter valid email address');}
    else if(this.fields.pre_entry_form_address == '1' && (this.participantsForms.pre_entry_form_address == '' || this.participantsForms.pre_entry_form_address == null)){this.common.presentToast('Enter your address')}
    else if(this.fields.pre_entry_form_city == '1' && (this.participantsForms.pre_entry_form_city == '' || this.participantsForms.pre_entry_form_city == null)){this.common.presentToast('Enter your city')}
    else if(this.fields.pre_entry_form_state == '1' && (this.participantsForms.pre_entry_form_state == '' || this.participantsForms.pre_entry_form_state == null)){this.common.presentToast('Enter your state')}
    else if(this.fields.pre_entry_form_country == '1' && (this.participantsForms.pre_entry_form_country == '' || this.participantsForms.pre_entry_form_country == null)){this.common.presentToast('Enter your country')}
    else if(this.fields.pre_entry_form_phone == '1' && (this.participantsForms.pre_entry_form_phone == '' || this.participantsForms.pre_entry_form_phone == null)){this.common.presentToast('Enter your phone number')}
    else if(this.fields.pre_entry_form_phone == '1' && await this.common.validateMobileNumber(this.participantsForms.pre_entry_form_phone) == false){this.common.presentToast('enter valid phone number')}
    else if(this.fields.pre_entry_form_birthday == '1' && (this.participantsForms.pre_entry_form_birthday == '' || this.participantsForms.pre_entry_form_birthday == null)){this.common.presentToast('Enter your birth date')}
    else if(this.fields.pre_entry_form_entry_code == '1' && (this.participantsForms.pre_entry_form_entry_code =='' || this.participantsForms.pre_entry_form_entry_code == null)){this.common.presentToast('Enter your entry code')}
    else if((this.participantsForms.contest_photo_video_name1 =='' || this.participantsForms.contest_photo_video_name1 == null) && (this.div2 || this.div3)){this.common.presentToast('Please upload photo or video url')}
    else if((this.participantsForms.contest_photo_video_url1 =='' || this.participantsForms.contest_photo_video_url1 == null) && this.div3){this.common.presentToast('Choose social media type')}
    else if(this.div3 && this.validateUrl1(this.participantsForms.contest_photo_video_name1)) {this.common.presentToast('Enter valid Url');}
    else if((this.participantsForms.contest_photo_video_name2 =='' || this.participantsForms.contest_photo_video_name2 == null) && (this.div12 || this.div13)){this.common.presentToast('Please upload photo or video url')}
    else if((this.participantsForms.contest_photo_video_url2 =='' || this.participantsForms.contest_photo_video_url2 == null) && this.div13){this.common.presentToast('Choose social media type')}
    else if(this.div13 && this.validateUrl1(this.participantsForms.contest_photo_video_name2)) {this.common.presentToast('Enter valid Url');}
    else if((this.participantsForms.contest_photo_video_name3 =='' || this.participantsForms.contest_photo_video_name3 == null) && (this.div22 || this.div23)){this.common.presentToast('Please upload photo or video url')}
    else if((this.participantsForms.contest_photo_video_url3 =='' || this.participantsForms.contest_photo_video_url3 == null) && this.div23){this.common.presentToast('Choose social media type')}
    else if(this.div23 && this.validateUrl1(this.participantsForms.contest_photo_video_name3)) {this.common.presentToast('Enter valid Url');}
    // else if(this.participantsForms.contest_photo_video_comments1 =='' || this.participantsForms.contest_photo_video_comments1 == null && this.div4){this.common.presentToast('Enter Comments')}
      else if(this.participantsForms){
      let refer=localStorage.getItem('ref_current_url');
      let userId = localStorage.getItem('UserId');
      let bday = this.datepipe.transform(this.participantsForms.pre_entry_form_birthday, 'MMM d y');
      this.participantsForms.value.pre_entry_form_birthday = bday;
      this.company_id = this.view.company_contest_id
      this.contest_id = this.view.web_id
      this.participant_id = userId;
      this.participantsForms.value.participant_id = userId;
      this.participantsForms.value.company_id = this.fields.company_id;
      this.participantsForms.value.campaign_id = this.view.web_id;
      this.participantsForms.value.campaign_type = this.view.campaign_type;
      this.participantsForms.value.email_id  = this.mail.company_email;
      this.participantsForms.value.user_limit = this.mail.user_limit;
      this.participantsForms.value.reward = this.reward_price;
      console.log('==============',this.live);
      
      if(this.live==='contest'){
      this.variable1=Array(this.participantsForms.contest_photo_video_name1);
      this.variable2=Array(this.participantsForms.contest_photo_video_name2);
      this.variable3=Array(this.participantsForms.contest_photo_video_name3);
      this.type1=Array(this.participantsForms.contest_photo_video_url1);
      this.type2=Array(this.participantsForms.contest_photo_video_url2);
      this.type3=Array(this.participantsForms.contest_photo_video_url3);
      this.type4=Array('image');
      this.variable=this.variable1;
      if(this.div12 || this.div13){
        this.variable=this.variable1.concat(this.variable2);
      }
      if(this.div22 || this.div23){
        this.variable=this.variable1.concat(this.variable2,this.variable3);
      }
      this.type=this.type1=this.div3? this.type1:this.type4;
      if(this.div12 || this.div13){
      this.type=this.type1=this.div13?this.type1.concat(this.type2):this.type1.concat(this.type4);
      }
      if(this.div22 || this.div23){
      this.type=this.type1=this.div23?this.type1.concat(this.type3):this.type1.concat(this.type4);
      }
      this.participantsForms.value.photo_video1 = this.variable;
      this.participantsForms.value.type = this.type;
      this.submission=referralCodeGenerator.custom('alphanumeric',3, 3,'submission');
      localStorage.setItem('submission_id',this.submission);
      this.participantsForms.value.submission=this.submission;
    }
      this.participantsForms.value.campaign_type=this.live;
      this.participantsForms.value.randomKey=refer;
      this.web.postData('addPreEntryForm',this.participantsForms.value).then((res) => {
        if (res.status == '200') {
          this.alert.successMsg(res.error,'');
          this.participantsForms.reset();
          this.currentpageUrl = ('https://remco.zerosoft.in/web/login/'+refer);
          localStorage.setItem('currentReferPageUrl',this.currentpageUrl);
          this.submissionUrl=('https://remco.zerosoft.in/web/login/'+userId);
          localStorage.setItem('currentsubmissionPageUrl',this.submissionUrl);
          let refers=localStorage.getItem('ref_current_url');
          let refered_value=localStorage.getItem('reference');
          console.log(refer);
          if(this.live==='contest' || this.live==='learn'){
            this.web.getData('addcredits?web_id='+ refer + '&campany_type='+ this.live).then((res) => {
              if (res.status == '200') {
                this.url = res.data;
              } else {
                // this.alert.errorMsg(res.error, '');
              }
            }, err => {
              this.alert.errorMsg('Connection Error', '');
            });
          }
          
          if(this.live==='contest'){
          let id=localStorage.getItem('id');
          let id1=localStorage.getItem('id1');
          let id2=localStorage.getItem('id2');
          this.router.navigate(['./contest-view-entry',id,id1,id2,refers]);
          }else if(this.live==='learn'){
            let id=localStorage.getItem('id');
            let id1=localStorage.getItem('id1');
            let id2=localStorage.getItem('id2');
            this.router.navigate(['./campaign-learn-and-earn-faq',id,id1,id2,refer]);
          }else if(this.live==='sweep'){
            let id=localStorage.getItem('id');
            let id1=localStorage.getItem('id1');
            let id2=localStorage.getItem('id2');
            this.router.navigate(['./contest-view-entry',id,id1,id2,refers]);
          }
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        this.alert.errorMsg('Connection error', '');
      });
    } else {
      this.alert.warningMsg('Check if all fields are filled properly and then try', '');
    }
  }
}