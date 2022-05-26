import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-email-forms',
  templateUrl: './email-forms.component.html',
  styleUrls: ['./email-forms.component.scss']
})
export class EmailFormsComponent {
  whyRunEmailForms: any;
  emailForms: any;
  quesId: any;
  showAns:boolean = false;
  productFeatures: any;

  constructor(
    private loaderService: LoaderService,
    private web: WebService,
    private alert: AlertService) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.getWhyRunEmailForms();
    this.getEmailForms();
    this.getProductFeatures();

  }

  getWhyRunEmailForms() {
    this.web.getData('getAllWhyRunEmailForms').then((res) => {
      if (res.status == '200') {
        this.whyRunEmailForms = res.data.slice(1,5);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getEmailForms() {
    this.web.getData('getAllWhyRunEmailForms').then((res) => {
      if (res.status == '200') {
        this.emailForms = res.data;
        console.log('plan is', this.emailForms[0].title);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getProductFeatures() {
    this.web.getData('getAllProductsFeatures').then((res) => {
      if (res.status == '200') {
        this.productFeatures = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  openAnswerBox(id) {
    if (this.quesId == id && this.showAns) {
      this.showAns = false;
      this.quesId = id;
    } else {
      this.quesId = id;
      this.showAns = true;
    }
  }

}
