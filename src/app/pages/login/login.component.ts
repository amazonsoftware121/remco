import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

import { LoaderService } from '../../providers/loader.service';
import { AlertService } from '../../providers/alertService';
import { WebService } from '../..//providers/web.serivce';
import { ActivatedRoute, Router } from '@angular/router';
import referralCodeGenerator from 'referral-code-generator'
import { MatDialog } from '@angular/material/dialog';
import { submissionImage } from './submission-image/submission-image.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: any;

  successMsg: boolean;

  errorMsg: boolean;
  restrict: any;
  userData: string;
  splite: any;
  splite_url: any;
  url: any;
  refer: string | null;
  ref_id: any;
  comp_id: any;
  comp_id1: any;
  url_id: any;
  image_url: string | null;
  referencer_url: any;
  ref_id_learn: any;
  comp_id2: any;
  learn_random_id: string | null;
  company_login_details: any;
  user_name$password: any;
  user_name: any;
  password: any;
  data: any;

  constructor(
    private loaderService: LoaderService,
    private alert: AlertService,
    private web: WebService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private dialog: MatDialog,
  ) {
    this.loaderService.stopLoader();
    
  }

  ngOnInit() {
    this.buildForm();
    this.activatedRoute.paramMap.subscribe((res: any) => {
      console.log(res)
      if (res.params.action == 'success') {
        this.successMsg = true;
        setTimeout(() => {
          this.successMsg = false;
        }, 5000);
      }
      else if (res.params.action == 'error') {
        this.errorMsg = true;
        setTimeout(() => {
          this.errorMsg = false;
        }, 5000);
      }
    });

    this.socialAuthService.initState.subscribe(res=>{
      console.log(res);
    })
    this.userData=window.location.href;
    localStorage.setItem('currentUrl',this.userData);
    console.log('------------>>',this.userData);
    this.splite=this.userData.split('/');
    this.splite_url=this.splite[5];
    console.log('------------Splite Url-->',this.splite_url);
    localStorage.setItem('ref',this.splite_url);
    this.refer=localStorage.getItem('reference');
    this.getcompanyId();
    this.getcompanyIdLearn();
    this.getRefLearn();
    this.getImageUrl();
    this.getRef();
  }

  getRef() {
    if(this.splite_url){
      let ref=localStorage.getItem('ref');
      let data = {
        ref: ref,
      }
      this.web.postData('getRefId',data).then((res) => {
        if (res.status == '200') {
          this.ref_id = res.data[0];
          console.log('---ref_id-->',this.ref_id);
          
          localStorage.setItem('compId',res.data[0].campaign_id);
          localStorage.setItem('compRandomId',res.data[0].user_random_key);
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        console.log(err);
        this.alert.errorMsg('Connection Error', '');
      });
    }
  }

  getRefLearn() {
    if(this.splite_url){
      let ref=localStorage.getItem('ref');
      let data = {
        ref: ref,
      }
      this.web.postData('getRefIdLearn',data).then((res) => {
        if (res.status == '200') {
          this.ref_id_learn = res.data[0];
          console.log('------>>',res.data[0].campaign_id);
          localStorage.setItem('compId_learn',res.data[0].campaign_id);
          localStorage.setItem('compRandomId_learn',res.data[0].user_random_key);
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        console.log(err);
        this.alert.errorMsg('Connection Error', '');
      });
    }
  }

  getcompanyId() {
    let comp_id=localStorage.getItem('compId');
    console.log('-------------comp_id-->',comp_id);
    
    let data1 = {
      comp_id: comp_id,
    }
    if(comp_id){
    this.web.postData('getcompId',data1).then((res) => {
      if (res.status == '200') {
        this.comp_id1 = res.data[0];
        console.log('-------------comp_type-->',this.comp_id1.campaign_type); 
        localStorage.setItem('compaign_type',this.comp_id1.campaign_type);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }
  }

  getcompanyIdLearn() {
    let comp_id=localStorage.getItem('compId_learn');
    console.log('-------------comp_id-->',comp_id);
    
    let data3 = {
      comp_id: comp_id,
    }
    if(comp_id){
    this.web.postData('getcompIdLearn',data3).then((res) => {
      if (res.status == '200') {
        this.comp_id2 = res.data[0];
        console.log('-------------comp_type-->',this.comp_id2);
        localStorage.setItem('compaign_type_learn',this.comp_id2.campaign_type);
        localStorage.setItem('company_learn_id',this.comp_id2.company_learn_id);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }
  }

  getImageUrl() {
    if(this.splite_url){
      let ref=localStorage.getItem('ref');
      let data3 = {
        image_url_id:ref,
      }
      if(ref){
      this.web.postData('getimageUrl',data3).then((res) => {
        if (res.status == '200') {
          this.url_id = res.data[0];
          localStorage.setItem('getImageUrlId',this.url_id.submission);
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        this.alert.errorMsg('Connection Error', '');
      });
    }
  }
  }

  getCompanies() {
    this.web.getData('getAllCompanyContests').then((res) => {
      if (res.status == '200') {
        this.url = res.data;
        console.log('THIS.ENDS DATA',this.url);
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signInWithSocial(type:string): void {
    // this.loginForm.loginMethod = type;
    if (type=='google') {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res)=>{
        // this.loginForm.auth_token = res.id;
        this.signInWithSocialCallback(res);
      }, err=>{
        console.log(err);
      });
    } 
    else if(type=='facebook'){
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=>{
        console.log(res);
        //this.loginForm.auth_token = res.id;
        this.signInWithSocialCallback(res);
      },err=>{
        console.log(err);
      })
    }
  }

  signInWithSocialCallback(res) {
    let data = {
      participant_email: res.email,
      firstName: res.firstName,
      lastName: res.lastName
    }
    this.web.postData("participantLoginSocial", data).then((res) => {
      if (res.status == "200") {
        localStorage.setItem('UserDetails', JSON.stringify(res.data));
        localStorage.setItem('UserId', res.id);
        localStorage.setItem('Role', 'Participant');
        this.router.navigate(['/login']);
        this.alert.successMsg(res.error, '');
      } else {
        // this.alert.errorMsg(res.error, '');
      }
    },
    (err) => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  onSubmit() {
    this.user_name=this.loginForm.value.email;
    this.password=this.loginForm.value.password;
    console.log('form value is', this.user_name);
    localStorage.setItem('companyUserName',this.user_name);
    localStorage.setItem('companyPassword',this.password);
    console.log('company login info',this.company_login_details);
    if (this.loginForm.valid) {
      this.web.postData('userLogin', this.loginForm.value).then((res) => {
        this.restrict = res.data;
          console.log('log--->',res);
          if (res.status == '200') {
            if(this.restrict.company_status=='1' || this.restrict.participant_status=='1'){
            this.alert.successMsg(res.error, '');
            let companyDetails = res.data;
            localStorage.setItem('UserDetails', JSON.stringify(companyDetails));
            localStorage.setItem('UserId', res.data.web_id);
            localStorage.setItem('Role', res.role);
            localStorage.setItem('access_token', res.data.token);
            console.log('--------token-------',res.data.token);
            this.loginForm.reset();
            let ref=localStorage.getItem('ref');
            this.refer=localStorage.getItem('compRandomId');
            this.image_url=localStorage.getItem('getImageUrlId');
            this.learn_random_id=localStorage.getItem('compRandomId_learn');
            if(this.splite_url===this.refer || this.splite_url===this.learn_random_id){
              console.log('if works-------------------');
              let comp_id=localStorage.getItem('compId');
              let type=localStorage.getItem('compaign_type');
              let comp_id_learn=localStorage.getItem('compId_learn');
              let type_learn=localStorage.getItem('compaign_type_learn');
              console.log('else works',type_learn);
              let campaign_learn_id=localStorage.getItem('company_learn_id');
              this.referencer_url=referralCodeGenerator.custom('alphanumeric',4, 6,'reference');
              localStorage.setItem('referencer_url',this.referencer_url);
              let referer=localStorage.getItem('referencer_url');
              console.log('type',type);
              
              if(type=='contest'){
                console.log('if works');
              this.router.navigate(['/campaign-full-view',comp_id,'contest',comp_id,referer]);
              }else if(type_learn=='learn'){
                console.log('else works');
                
                this.router.navigate(['/campaign-full-view',comp_id_learn,'learn',campaign_learn_id,referer]);
              }
              // this.web.getData('addcredits?web_id='+ this.splite_url + '&campaign_type='+ type).then((res) => {
              //   if (res.status == '200') {
              //     this.url = res.data;
              //     console.log('THIS.ENDS DATA',this.url);
              //   } else {
              //     // this.alert.errorMsg(res.error, '');
              //   }
              // }, err => {
              //   this.alert.errorMsg('Connection Error', '');
              // });
              
            }else if(this.splite_url===this.image_url){
              console.log('splite url',this.splite_url);
              console.log('image url',this.image_url);
              this.router.navigate(['/my-account']);
              setTimeout(() => {
                this.dialog.open(submissionImage, {data:this.splite_url,disableClose: true, height: '600px', width: '900px' });
              }, 3000);
              
              // this.router.navigate(['./contest-fullview-gallary',this.image_url]);
            }else{
            this.router.navigate(['/my-account']);
            }
          }else{
            // this.alert.errorMsg(res.error, '');
          }
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
}
