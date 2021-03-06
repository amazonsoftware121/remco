import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AlertService } from 'src/app/providers/alertService';
import { CommonService } from 'src/app/providers/common.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { CampaignRules } from '../campaign-rules/campaign-rules.component';
import countriesCode from 'src/assets/countries.json'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-widget-view',
  templateUrl: './campaign-widget-view.component.html',
  styleUrls: ['./campaign-widget-view.component.scss']
})
export class CampaignWidgetViewComponent implements OnInit {

  participantsForms:any;

  contactUsForm: any;

  view: any

  view1: any

  base_url:string = environment.base_url;

  fields:any

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
  company_id: any;
  contest_id: any;
  participant_id: string | null;
  mail: any;
  countDownDate: number;
  demo: string;
  label: string;
  countries: any = countriesCode;
  country: string;
  countryCode: any;

  constructor(private loaderService: LoaderService,
    private alert: AlertService,
    private activateRoute: ActivatedRoute,
    private web: WebService,
    private datepipe :DatePipe,
    public common: CommonService,
    private dialog: MatDialog,
    ) {
    this.loaderService.stopLoader();
   }

  ngOnInit(): void {
    this.buildcontactUsForm()
    this.formVisiblity(this.activateRoute.params['_value'].id,this.activateRoute.params['_value'].id1);
    this.preEntryForm(this.activateRoute.params['_value'].id2,this.activateRoute.params['_value'].id1);
    this.getEmail(this.activateRoute.params['_value'].id2);
  }

  formVisiblity(id,id1) {
    this.web.getData('getAllCompaniesId?web_id='+ id + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        this.view = res.data[0];
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
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  preEntryForm(id2,id1) {
    this.web.getData('getAllCompanyEntryFields?company_id='+ id2 + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        this.fields = res.data[0];
        this.getCountry(this.fields.pre_entry_form_country);
        this.selectedCode(this.fields.pre_entry_form_country);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getEmail(id2) {
    this.web.getData('getEmail?company_id='+ id2).then((res) => {
      if (res.status == '200') {
        this.mail = res.data[0];
        console.log('lllllllll',this.mail);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
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

  openDialog(data1:any) {
    data1=this.view.company_official_rules
    const dialogRef = this.dialog.open(CampaignRules, { data: data1, disableClose: true, height: '230px', width: '600px' });
    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      if (sub) {
        this.label = "Submitted";
      } else {
        this.label = "Cancelled";
      }
    })
  }

  async onSubmit() {
    console.log('THIS.participantsForms',this.participantsForms);
  if(this.fields.pre_entry_form_name == '1' && (this.participantsForms.pre_entry_form_name == '' || this.participantsForms.pre_entry_form_name == null)){this.common.presentToast('Enter your name');}
  else if(this.fields.pre_entry_form_email == '1' && (this.participantsForms.pre_entry_form_email == '' || this.participantsForms.pre_entry_form_email == null)){this.common.presentToast('Enter your email');}
  else if(this.fields.pre_entry_form_email == '1' && this.common.validateEmail(this.participantsForms.pre_entry_form_email)) {this.common.presentToast('Enter valid email address');}
  else if(this.fields.pre_entry_form_address == '1' && (this.participantsForms.pre_entry_form_address == '' || this.participantsForms.pre_entry_form_address == null)){this.common.presentToast('Enter your address')}
  else if(this.fields.pre_entry_form_city == '1' && (this.participantsForms.pre_entry_form_city == '' || this.participantsForms.pre_entry_form_city == null)){this.common.presentToast('Enter your city')}
  else if(this.fields.pre_entry_form_state == '1' && (this.participantsForms.pre_entry_form_state == '' || this.participantsForms.pre_entry_form_state == null)){this.common.presentToast('Enter your state')}
  else if(this.fields.pre_entry_form_country == '1' && (this.participantsForms.pre_entry_form_country == '' || this.participantsForms.pre_entry_form_country == null)){this.common.presentToast('enter your country')}
  else if(this.fields.pre_entry_form_phone == '1' && (this.participantsForms.pre_entry_form_phone == '' || this.participantsForms.pre_entry_form_phone == null)){this.common.presentToast('Enter your phone number')}
  else if(this.fields.pre_entry_form_phone == '1' && await this.common.validateMobileNumber(this.participantsForms.pre_entry_form_phone) == false){this.common.presentToast('enter valid phone number')}
  else if(this.fields.pre_entry_form_birthday == '1' && (this.participantsForms.pre_entry_form_birthday == '' || this.participantsForms.pre_entry_form_birthday == null)){this.common.presentToast('Enter your birth date')}
  else if(this.fields.pre_entry_form_entry_code == '1' && (this.participantsForms.pre_entry_form_entry_code =='' || this.participantsForms.pre_entry_form_entry_code == null)){this.common.presentToast('Enter your entry code')}
    else if(this.participantsForms){
    let userId = localStorage.getItem('UserId');
    let bday = this.datepipe.transform(this.participantsForms.pre_entry_form_birthday, 'MMM d y');
    this.participantsForms.value.pre_entry_form_birthday = bday;
    console.log('COMPANY_MAIL',this.participantsForms.value);
    this.company_id = this.view.company_contest_id
    this.contest_id = this.view.web_id
    this.participant_id = userId;
    this.participantsForms.value.participant_id = userId;
    this.participantsForms.value.company_id = this.fields.company_id;
    this.participantsForms.value.campaign_id = this.view.web_id;
    this.participantsForms.value.campaign_type = this.view.campaign_type;
    this.participantsForms.value.email_id  = this.mail.company_email;
    this.participantsForms.value.user_limit = this.mail.user_limit;
    console.log('COMPANY_MAIL',this.participantsForms.value);
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

}
