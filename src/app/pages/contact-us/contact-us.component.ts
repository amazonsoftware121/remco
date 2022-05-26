import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactUsForm: any;
  contacts: any;

  constructor(private loaderService: LoaderService, private alert: AlertService, private web: WebService) {
    this.loaderService.stopLoader();
  }

  ngOnInit(): void {
    this.buildcontactUsForm();
    this.getContactsInfo();
  }

  buildcontactUsForm() {
    this.contactUsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),]),
      message: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.contactUsForm.value);
    if (this.contactUsForm.valid) {
      this.web.postData('addContactUs', this.contactUsForm.value).then((res) => {
        if (res.status == '200') {
          console.log('data is', res);
          this.alert.successMsg(res.error, '');
          this.contactUsForm.reset();
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

  getContactsInfo() {
    this.web.getData('getAllContactInfo').then((res) => {
      if (res.status == '200') {
        this.contacts = res.data;
        console.log('plan is', this.contacts[0].title);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }
}