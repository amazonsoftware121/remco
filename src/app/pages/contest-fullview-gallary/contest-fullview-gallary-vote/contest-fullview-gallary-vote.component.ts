import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import referralCodeGenerator from 'referral-code-generator'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contest-fullview-gallary-vote',
  templateUrl: './contest-fullview-gallary-vote.component.html',
  styleUrls: ['./contest-fullview-gallary-vote.component.scss']
})
export class ContestFullviewGallaryVoteComponent implements OnInit {

  value:any={};

  base_url: string = environment.base_url;

  email:boolean=true;

  varify_email:boolean=true;

  fetchingStatus: boolean = true;

  btn:boolean=true;

  btn1:boolean=true;

  animation = 'pulse';

  btn2:boolean=true
  contactUsForm: any;
  refer: any={};
  varifyForm: any;
  img_id: any;
  url: any;

  typeSelected: string;
  emails: any;
  campaign_id: any;
  as:any;

  constructor(private spinnerService:NgxSpinnerService,private dialog: MatDialogRef<ContestFullviewGallaryVoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private web:WebService,private alert:AlertService) 
    {
      this.value = data.web_id;
      this.campaign_id=data.campaign_id;console.log('official rules',this.campaign_id);
      this.email=false
      this.btn1=false
      this.btn2=false
      this.varify_email=false
      this.typeSelected = 'ball-fussion';
    }

    getImageId(data) {
      this.fetchingStatus = true;
      this.spinnerService.show();
      this.web.getData('getImageId?web_id='+ data.web_id).then((res) => {
        if (res.status == '200') {
          this.img_id = res.data[0];
          setTimeout(() => {
            this.fetchingStatus = false;
            this.spinnerService.show();
          }, Math.random() * 2000 + 2000);
        } else {
          this.alert.errorMsg(res.error, '');
        }
      }, err => {
        console.log(err);
        this.alert.errorMsg('Connection Error', '');
      });
    }

    check(data: any){
      this.getImageId(data.web_id)
    }

    @HostListener('document:keyup.escape') onClose() {
      this.close();
    }
  
    close() {
      this.dialog.close();
    }
    sample(data)
    {

      console.log(data);
      return 'data';
    }
    getEmail(){
      this.email=true;
      this.btn=false;
      this.btn1=true
    }

    buildcontactUsForm() {
      this.contactUsForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        ),]),
      });
    }

    verificationForm() {
      this.varifyForm = new FormGroup({
        verification_code: new FormControl('', [Validators.required]),
      });
    }

    getEmails() {
      let userId = localStorage.getItem('UserId');
      this.web.getData('getEmails?company_id='+ userId).then((res) => {
        if (res.status == '200') {
          this.emails = res.data[0];
          console.log('email',this.emails.participant_email);
          
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        this.alert.errorMsg('Connection Error', '');
      });
    }

    getEmail1(){
      this.refer=referralCodeGenerator.custom('lowercase', 2, 6, 'verification');
      localStorage.setItem('set_verification_code',this.refer);
      if (this.contactUsForm.valid) {
        this.contactUsForm.value.varification_code=this.refer;
        this.contactUsForm.value.campaign_id=this.campaign_id;
        this.web.postData('getVerificationCode', this.contactUsForm.value).then((res) => {
          if (res.status == '200') {
            this.email=true;
            this.btn=false;
            this.btn1=false;
            this.btn2=true;
            this.varify_email=true
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

    getEmail2(){
      let verification_code1=localStorage.getItem('set_verification_code');
      if (this.varifyForm.valid) {
          if(verification_code1===this.varifyForm.value.verification_code){
          let userId = localStorage.getItem('UserId');
          this.varifyForm.value.email=this.contactUsForm.value.email;
          this.varifyForm.value.id=userId;
          this.varifyForm.value.voted_image=this.img_id.contest_image_video;
          this.varifyForm.value.voted_image_id=this.img_id.web_id;
          this.varifyForm.value.campaign_id=this.campaign_id;
          this.web.postData('addVote',this.varifyForm.value).then((res) => {
            if (res.status == '200') {
              let refer=localStorage.getItem('reference');
              this.web.getData('addcredits?web_id='+ refer + '&campany_type='+ 'contest').then((res) => {
                if (res.status == '200') {
                  this.url = res.data;
                } else {
                  // this.alert.errorMsg(res.error, '');
                }
              }, err => {
                this.alert.errorMsg('Connection Error', '');
              });
              console.log('data is', res);
              this.alert.successMsg(res.error, '');
              this.varifyForm.reset();
              this.contactUsForm.reset();
              this.btn=true;
              this.btn2=false;
              this.email=false;
              this.varify_email=false;
            } else {
              this.alert.errorMsg(res.error, '');
            }
          }, err => {
            console.log(err);
            this.alert.errorMsg('Connection Error', '');
          });
        }else{
          this.alert.warningMsg('Verification code does not match', '');
        }
      } else {
        this.alert.warningMsg('Check if all fields are filled properly and then try', '');
      }
    }

  ngOnInit(): void {
    this.getEmails();
    this.buildcontactUsForm();
    this.verificationForm();
    this.getImageId(this.data);
  }
}
