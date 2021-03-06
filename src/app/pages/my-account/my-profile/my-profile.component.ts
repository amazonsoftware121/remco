import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../../providers/alertService';
import { WebService } from '../../../providers/web.serivce';
import countriesCode from "../../../../assets/countries.json";
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/providers/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/providers/loader.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  base_url: string = environment.base_url;

  userType: any;

  userId: any;

  editCompany: boolean = false;

  editParticipant: boolean = false;

  accountInfo: any;

  country: any;

  companyForm: any;

  participantsForm: any;

  countries: any = countriesCode;

  countryCode: any;

  fetchingStatus: boolean = true;

  loading: boolean=false;
  
  loaderTheme = {
    'background-color': '#E5E5E5',
    'margin-bottom':0,
    'display':'flex'
  }
  name: string | undefined;
  ententionName: string | undefined;
  code: any;
  countryCodes: any;
  countrys: string;
  company_login_details: any;
  company_password: string | null;
  company_user_name: string | null;
  loginForm: any;
  constructor(
    private web: WebService,
    private alert: AlertService,
    private common: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {
    this.userId = localStorage.getItem('UserId');
    this.userType = localStorage.getItem('Role');
      this.getAccountDetails();

  }

  ngOnInit() {
    this.getAccountDetails();
    this.buildCompanyForm();
    this.buildParticipantsForm();
    this.company_user_name=localStorage.getItem('companyUserName');
    this.company_password=localStorage.getItem('companyPassword');
    console.log('company_user_name',this.company_user_name);
    console.log('company_password',this.company_password);
    this.loginForm.value=this.company_user_name;
    this.loginForm.value=this.company_password;
  }

  adminLogin(){
    let data = {
      company_email: this.company_user_name,
      company_password: this.company_password,
    }
    console.log('company login credentials',data);
    
    this.web.postDataAdmin('companyLogin', data).then(res=>{
        if(res.status=='200'){
            console.log(res);
            console.log('res data');
            localStorage.setItem('remcoCompanyAdminId', res.data.web_id);
            localStorage.setItem('remcoCompanyAdminName', res.data.company_name);
            localStorage.setItem('remcoCompanyAdminToken', res.token);
            setTimeout(() => {
              this.loading = false;
              window.open(
                'https://remco.zerosoft.in/companyadmin/pages/dashboard',
                '_blank' // <- This is what makes it open in a new window.
              );
              // location.href='https://remco.zerosoft.in/companyadmin/pages/dashboard','_blank';
              // // this.router.navigate(['https://remco.zerosoft.in/companyadmin/pages/dashboard']);
              console.log('dashboard');
            }, 800);
        }else{
          this.loading = false;
          this.alert.errorMsg('', res.error);
        }
    }).catch(err=>{
      this.loading = false;
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  buildCompanyForm() {
    this.companyForm = new FormGroup({
      company_id: new FormControl(''),
      company_name: new FormControl('', [Validators.required]),
      company_description: new FormControl('', [Validators.required]),
      company_country_code: new FormControl('', [Validators.required]),
      company_phone: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required]),
      company_website: new FormControl('', [Validators.required, Validators.pattern(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),
      company_email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),])
    });
  }

  buildParticipantsForm() {
    this.participantsForm = new FormGroup({
      participant_id: new FormControl(''),
      participant_fname: new FormControl('', [Validators.required]),
      participant_lname: new FormControl('', [Validators.required]),
      participant_country_code: new FormControl('', [Validators.required]),
      participant_phone: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required]),
      participant_email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),])
    });
  }

  getAccountDetails() {
    let data = {
      userId: this.userId,
      role: this.userType
    }
    this.fetchingStatus = true;
    this.web.postData('getAccountDetails', data).then((res) => {
      if (res.status == '200') {
        this.accountInfo = res.data;
        this.getCountry(res.data.company_country_code || res.data.participant_country_code);
        this.selectedCode(res.data.company_country_code || res.data.participant_country_code);
        console.log('account details is', res.data);
        setTimeout(() => {
          this.fetchingStatus = false;
        }, Math.random() * 2000 + 2000);
        // console.log('account details is', res);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getCountry(code) {
    countriesCode.find((obj) => {
      if (obj.phonecode === code) {
        this.country = obj.name;
        console.log('[[[[>',this.country);
      }
    });
  }

  selectedCode(data) {
    this.countryCode = data;
    this.code=this.countryCode.split("/");
    this.countryCodes = this.code[0]
  }

  patchCompanyForm() {
    this.companyForm.patchValue({
      company_name: this.accountInfo.company_name,
      company_country_code: this.accountInfo.company_country_code,
      company_phone: this.accountInfo.company_phone,
      company_website: this.accountInfo.company_website,
      company_email: this.accountInfo.company_email,
      company_description: this.accountInfo.company_description,
      profile: this.accountInfo.profile
    });
  }

  pathParticipantsForm() {
    this.participantsForm.patchValue({
      participant_fname: this.accountInfo.participant_fname,
      participant_lname: this.accountInfo.participant_lname,
      participant_country_code: this.accountInfo.participant_country_code,
      participant_phone: this.accountInfo.participant_phone,
      participant_email: this.accountInfo.participant_email,
      profile: this.accountInfo.profile,
    });
  }
 
  openEditCompany() {
    this.editCompany = true;
    this.patchCompanyForm();
  }

  closeEditCompany() {
    this.editCompany = false;
    // window.location.reload();
    this.loaderService.stopLoader();
  }

  openEditParticipant() {
    this.editParticipant = true;
    this.pathParticipantsForm();
  }

  closeEditParticipant() {
    this.editParticipant = false;
    // window.location.reload();
    this.loaderService.stopLoader();
  }


  editCompanyInfo() {
    this.companyForm.get('company_id').setValue(this.userId);
    this.loading=true;
    if (this.companyForm.valid) {
      countriesCode.find((obj) => {
        if (obj.phonecode === this.countryCode) {
          this.countrys = obj.name;
          console.log
        }
      });
      this.companyForm.value.company_country=this.countrys;
      this.web.postData('editCompanyInfo', this.companyForm.value).then((res) => {
        if (res.status == '200') {
          this.alert.successMsg(res.error, '');
          this.editCompany = false;
          window.location.reload();
          this.ngOnInit();
        } else {
          this.alert.errorMsg(res.error, '');
        }
      }, err => {
        console.log(err);
        this.alert.errorMsg('Connection Error', '');
      });
    } else {
      this.alert.warningMsg('Check if all fields are filled properly and then try', '')
    }
  }

  editParticipantInfo() {
    this.participantsForm.get('participant_id').setValue(this.userId);
    if (this.participantsForm.valid) {
      this.web.postData('editParticipantInfo',this.participantsForm.value).then((res) => {
        console.log('console value is -->',this.participantsForm.value);
        if (res.status == '200') {
          this.alert.successMsg(res.error, '');
          this.editParticipant = false;
          window.location.reload();
          this.ngOnInit();
        } else {
          this.alert.errorMsg(res.error, '');
        }
      }, err => {
        console.log(err);
        this.alert.errorMsg('Connection Error', '');
      });
    } else {
      this.alert.warningMsg('Check if all fields are filled properly and then try', '')
    }
  }

  openDetails(data) 
  { 
    this.router.navigate(['/sidebar', data.web_id]); 
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.onSubmit(files);
    }
  }

  onSubmit(file: any) {
    let d = new Date();
    let n: any = d.valueOf();
    let fname = file[0].name;
    fname = fname.substring(fname.lastIndexOf('.') + 1, fname.length) || fname;
    let filename = 'Remco_' + n.toString().substring(4, 8) + file[0].name;
    const formData = new FormData();
    formData.append("image", file[0]);
    formData.append("image", filename);
    formData.append("profile", filename);
    this.loading = true;
    this.web.uploadWebsitePicture(`${this.base_url}restapi/upload_website_profile_picture.php?filename=`+ filename, formData).subscribe((Res: any) => {
      this.loading = false;
      this.ententionName=filename.split('.').pop();  
      console.log('filename',this.name)
      if(this.ententionName=='png' || this.ententionName=='jpg' || this.ententionName=='jpeg'){
      if (Res.status == '200') {
        this.alert.successMsg(Res.error, '');
        this.accountInfo.profile = filename;
        this.participantsForm.get('profile').setValue(filename);
        console.log('the img is---<>',filename);
      } else {
        this.alert.errorMsg(Res.error, '');
      }
    }else{
      this.alert.errorMsg('Please upload valid images', '');
    }
    }, (err) => {
      this.alert.errorMsg('Connection Error', '');
      this.loading = false;
    }); 
  }

  onFileChanges(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.onSubmite(files);
    }
  }

  onSubmite(file: any) {
    let d = new Date();
    let n: any = d.valueOf();
    let fname = file[0].name;
    fname = fname.substring(fname.lastIndexOf('.') + 1, fname.length) || fname;
    let filename = 'Remco_' + n.toString().substring(4, 8) + file[0].name;
    const formData = new FormData();
    formData.append("image", file[0]);
    formData.append("image", filename);
    formData.append("profile", filename);
    this.loading = true;
    this.web.uploadWebsitePicture(`${this.base_url}restapi/upload_website_profile_picture.php?filename=`+ filename, formData).subscribe((Res: any) => {
      this.loading = false;
      this.ententionName=filename.split('.').pop();  
      console.log('filename',this.name)
      if(this.ententionName=='png' || this.ententionName=='jpg' || this.ententionName=='jpeg'){
      if (Res.status == '200') {
        this.alert.successMsg(Res.error, '');
        this.accountInfo.profile = filename;
        this.companyForm.get('profile').setValue(filename);
        console.log('the img is---<>',filename);
      } else {
        this.alert.errorMsg(Res.error, '');
      }
    }else{
      this.alert.errorMsg('Please upload valid images', '');
    }
    }, (err) => {
      this.alert.errorMsg('Connection Error', '');
      this.loading = false;
    }); 
  }
} 