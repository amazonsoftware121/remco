import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { LoaderService } from '../../providers/loader.service';

declare let $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  contactwithUsForm: any;

  site: any;
  contact: any;
  contents: any;
  contacts: any;

  constructor(
    private loaderService: LoaderService, private alert: AlertService, private web: WebService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.buildcontactwithUsForm();
    this.getAllSite();
    this.getContents();
    this.getContactsInfo();
  }

  getAllSite() {
    this.web.getData('getAllSites').then((res) => {
      if (res.status == '200') {
        this.site = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getContents() {
    this.web.getData('getAllContents').then((res) => {
      if (res.status == '200') {
        this.contents = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  onTop(event: any) {
    event.preventDefault(), $("html, body").animate({ scrollTop: 0 }, 300);
  }
  buildcontactwithUsForm() {
    this.contactwithUsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),]),
      message: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.contactwithUsForm.value);
    if (this.contactwithUsForm.valid) {
      this.web.postData('addContacWithtUs', this.contactwithUsForm.value).then((res) => {
        if (res.status == '200') {
          this.alert.successMsg(res.error, '');
          this.contactwithUsForm.reset();
        } else {
          this.alert.errorMsg(res.error, '');
        }
      }, err => {
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
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

}
