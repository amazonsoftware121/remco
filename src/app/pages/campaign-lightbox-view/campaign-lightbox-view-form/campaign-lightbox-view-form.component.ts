import { DatePipe } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AlertService } from 'src/app/providers/alertService';
import { CommonService } from 'src/app/providers/common.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import countriesCode from 'src/assets/countries.json'
import { CampaignRules } from '../../campaign-rules/campaign-rules.component';

@Component({
  selector: 'app-campaign-lightbox-view-form',
  templateUrl: './campaign-lightbox-view-form.component.html',
  styleUrls: ['./campaign-lightbox-view-form.component.scss']
})
export class CampaignLightboxViewFormComponent implements OnInit {

  value;

  view:any
  
  base_url:string = environment.base_url;

  participantsForms:any;

  company_id:any;

  contest_id:any;

  participant_id:any;

  testimonialOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
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
  countDownDate: number;
  demo: string;
  countries: any = countriesCode;
  country: string;
  countryCode: any;
  label: string;

  constructor(private dialog: MatDialogRef<CampaignLightboxViewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private web: WebService,
    private alert: AlertService,
    private datepipe :DatePipe,
    public common: CommonService,
    private dialog1: MatDialog,
    )
  { this.value = data;
    this.value.view.company_start_date = this.value.view.company_start_date *1000;
    this.value.view.company_end_date = this.value.view.company_end_date *1000;
    this.countDownDate = new Date(this.value.view.company_end_date).getTime();
    let x = setInterval(()=>{
      var now = new Date().getTime();
      var distance = this.countDownDate - now;
      var days = Math.floor(distance/(1000*60*60*24));
      var hour = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
      var minute = Math.floor((distance % (1000*60*60))/ (1000*60));
      var seconds = Math.floor((distance % (1000*60)) / 1000);
      this.demo = days + "d  " + hour +"h  " + minute +"m  " + seconds + "s  ";
    });
    this.getCountry(this.value.fields.pre_entry_form_country);
    this.selectedCode(this.value.fields.pre_entry_form_country);
  }

  openDialog(data1:any) {
    data1=this.value.view.company_official_rules
    const dialogRef = this.dialog1.open(CampaignRules, { data: data1, disableClose: true, height: '230px', width: '600px' });
    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      if (sub) {
        this.label = "Submitted";
      } else {
        this.label = "Cancelled";
      }
    })
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

  @HostListener('document:keyup.escape') onClose() {
    this.close();
  }

  submit() {
    this.dialog.close(true);
  }

  close() {
    this.participantsForms.get('pre_entry_form_name').clearValidators();
    this.participantsForms.get('pre_entry_form_email').clearValidators();
    this.dialog.close();
  }

  ngOnInit(): void {
    this.buildcontactUsForm();
    
  }

  // openDialog(data1:any) {
  //   data1=this.view.company_official_rules
  //   const dialogRef = this.dialog1.open(CampaignRules, { data: data1, disableClose: true, height: '230px', width: '600px' });
  //   console.log(dialogRef.afterClosed());
  //   dialogRef.afterClosed().subscribe((sub) => {
  //     if (sub) {
  //       this.label = "Submitted";
  //     } else {
  //       this.label = "Cancelled";
  //     }
  //   })
  // }

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
      pre_entry_form_entry_code: new FormControl('', [Validators.required])
    });
  }

  async onSubmit() {
    console.log('THIS.participantsForms',this.participantsForms);
  if(this.value.fields.pre_entry_form_name == '1' && (this.participantsForms.pre_entry_form_name == '' || this.participantsForms.pre_entry_form_name == null)){this.common.presentToast('Enter your name');}
  else if(this.value.fields.pre_entry_form_email == '1' && (this.participantsForms.pre_entry_form_email == '' || this.participantsForms.pre_entry_form_email == null)){this.common.presentToast('Enter your email');}
  else if(this.value.fields.pre_entry_form_email == '1' && this.common.validateEmail(this.participantsForms.pre_entry_form_email)) {this.common.presentToast('Enter valid email address');}
  else if(this.value.fields.pre_entry_form_address == '1' && (this.participantsForms.pre_entry_form_address == '' || this.participantsForms.pre_entry_form_address == null)){this.common.presentToast('Enter your address')}
  else if(this.value.fields.pre_entry_form_city == '1' && (this.participantsForms.pre_entry_form_city == '' || this.participantsForms.pre_entry_form_city == null)){this.common.presentToast('Enter your city')}
  else if(this.value.fields.pre_entry_form_state == '1' && (this.participantsForms.pre_entry_form_state == '' || this.participantsForms.pre_entry_form_state == null)){this.common.presentToast('Enter your state')}
  else if(this.value.fields.pre_entry_form_country == '1' && (this.participantsForms.pre_entry_form_country == '' || this.participantsForms.pre_entry_form_country == null)){this.common.presentToast('enter your country')}
  else if(this.value.fields.pre_entry_form_phone == '1' && (this.participantsForms.pre_entry_form_phone == '' || this.participantsForms.pre_entry_form_phone == null)){this.common.presentToast('Enter your phone number')}
  else if(this.value.fields.pre_entry_form_phone == '1' && await this.common.validateMobileNumber(this.participantsForms.pre_entry_form_phone) == false){this.common.presentToast('enter valid phone number')}
  else if(this.value.fields.pre_entry_form_birthday == '1' && (this.participantsForms.pre_entry_form_birthday == '' || this.participantsForms.pre_entry_form_birthday == null)){this.common.presentToast('Enter your birth date')}
  else if(this.value.fields.pre_entry_form_entry_code == '1' && (this.participantsForms.pre_entry_form_entry_code =='' || this.participantsForms.pre_entry_form_entry_code == null)){this.common.presentToast('Enter your entry code')}
    else if(this.participantsForms){
    let userId = localStorage.getItem('UserId');
    let bday = this.datepipe.transform(this.participantsForms.pre_entry_form_birthday, 'MMM d y');
    this.participantsForms.value.pre_entry_form_birthday = bday;
    console.log('COMPANY_MAIL',this.participantsForms.value);
    this.participant_id = userId;
    this.participantsForms.value.participant_id = userId;
    this.participantsForms.value.company_id = this.value.fields.company_id;
    this.participantsForms.value.campaign_id = this.value.view.web_id;
    this.participantsForms.value.campaign_type = this.value.view.campaign_type;
    let emailId = localStorage.getItem('companyId');
    this.participantsForms.value.email_id  = emailId;
    this.participantsForms.value.user_limit = this.value.mail.user_limit;
    this.web.postData('addPreEntryForm',this.participantsForms.value).then((res) => {
      if (res.status == '200') {
        this.alert.successMsg(res.error, '');
        this.participantsForms.reset();
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection error', '');
    });
  } else {
    this.alert.warningMsg('Check if all fields are filled properly and then try', '');
  }
}

// onSubmit() {
//   // if (this.participantsForms.valid) {
//     let userId = localStorage.getItem('UserId');
//     // this.company_id = this.view.company_contest_id
//     // this.contest_id = this.view.web_id
//     this.participant_id = userId;
//     this.participantsForms.value.participant_id = userId;
//     this.participantsForms.value.company_id = this.value.fields.company_id;
//     this.participantsForms.value.campaign_id = this.value.view.web_id;
//     this.participantsForms.value.campaign_type = this.value.view.campaign_type;
//     let emailId = localStorage.getItem('companyId');
//     this.participantsForms.value.email_id  = emailId;
//     this.web.postData('addPreEntryForm',this.participantsForms.value).then((res) => {
//       if (res.status == '200') {
//         this.alert.successMsg(res.error, '');
//         this.participantsForms.reset();
//       } else {
//         this.alert.errorMsg(res.error, '');
//       }
//     }, err => {
//       console.log(err);
//       this.alert.errorMsg('Connection Error', '');
//     });
//   // } else {
//   //   this.alert.warningMsg('Check if all fields are filled properly and then try', '');
//   // }
// }


}
