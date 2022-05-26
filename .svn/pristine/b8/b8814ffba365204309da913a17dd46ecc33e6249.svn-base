import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoaderService } from '../../providers/loader.service';
import { AlertService } from '../../providers/alertService';
import { WebService } from '../../providers/web.serivce';
import countriesCode from './../../../assets/countries.json';
import { CommonService } from 'src/app/providers/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  companyForm: any;

  participantsForm: any;

  countries: any = countriesCode;

  partCountryCode: any;

  comCountryCode: any;
  partCountryname: any;
  code: any;
  countryCode: any;
  codes: any;
  countrycompanyCode: any;

  constructor(
    private loaderService: LoaderService,
    private alert: AlertService,
    private web: WebService,
    public common: CommonService,
    private router:Router
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.buildCompanyForm();
    this.buildParticipantsForm();
    // this.getCountries();
    console.log('-----==---------=', this.countries)
  }

  // getCountries() {
  //   this.web.getCountries().subscribe((data) => {
  //     this.countries = data;
  //     console.log('--------------;;>', this.countries);
  //   });
  // }

  buildCompanyForm() {
    this.companyForm = new FormGroup({
      company_name: new FormControl('', [Validators.required]),
      company_description: new FormControl('', [Validators.required]),
      company_country_code: new FormControl('', [Validators.required]),
      company_phone: new FormControl('', [Validators.required]),
      company_website: new FormControl('', [Validators.required, Validators.pattern(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),
      company_email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),]),
      company_password: new FormControl('', [Validators.required]),
      company_cpassword: new FormControl('', [Validators.required]),
    });
  }

  buildParticipantsForm() {
    this.participantsForm = new FormGroup({
      participant_fname: new FormControl('', [Validators.required]),
      participant_lname: new FormControl('', [Validators.required]),
      participant_country_code: new FormControl('', [Validators.required]),
      participant_phone: new FormControl('', [Validators.required]),
      participant_email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),]),
      participant_password: new FormControl('', [Validators.required]),
      participant_cpassword: new FormControl('', [Validators.required]),
    });
  }

  selectedCodeCom(event) {
    console.log('value is', event.value);
    this.comCountryCode = event.value;
    this.codes=this.comCountryCode.split("/");
    this.countrycompanyCode = this.codes[0]
  }

  selectedCodePar(event) {
    this.partCountryCode = event.value;
    this.code=this.partCountryCode.split("/");
    this.countryCode = this.code[0]
    console.log('=============>', this.partCountryCode);
  }

  selectedcountryname(data) {
    console.log('++++++++',data);
    this.partCountryname = data;
  }

  submitCompany() {
    console.log('----Company_password',this.companyForm.value.company_password);
    console.log('----company_confirm_password',this.companyForm.company_cpassword);
    if(this.companyForm.company_cpassword == '' || this.companyForm.company_cpassword == null){this.alert.warningMsg('Enter confirm password','');}
    else if (this.companyForm.value.company_password != this.companyForm.company_cpassword) {
      this.common.presentToast('Confirm password is mismatched')
    }
    else if (this.companyForm.valid) {
      this.web.postData('companyRegistration', this.companyForm.value).then((res) => {
        if (res.status == '200') {
          console.log('data is', res);
          this.alert.successMsg(res.error, '');
          this.companyForm.reset();
          this.comCountryCode = '';
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

  submitParticipants() {
    console.log('----participants_password',this.participantsForm.value.company_password);
    console.log('----participants_confirm_password',this.participantsForm.company_cpassword);
    if(this.participantsForm.participant_cpassword == '' || this.participantsForm.participant_cpassword == null){this.alert.warningMsg('Enter confirm password','');}
    else if (this.participantsForm.value.participant_password != this.participantsForm.participant_cpassword) {
      this.common.presentToast('Confirm password is mismatched')
    }
    else if(this.participantsForm.valid) {
      this.web.postData('participantRegistration', this.participantsForm.value).then((res) => {
        if (res.status == '200') {
          console.log('data is', res);
          this.alert.successMsg(res.error, '');
          this.participantsForm.reset();
          this.partCountryCode = '';
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

  // login(data){
  //   this.router.navigate(['/login',data]);
  // }

}
