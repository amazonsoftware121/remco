import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoaderService } from '../../../providers/loader.service';
import { AlertService } from '../../../providers/alertService';
import { WebService } from '../../../providers/web.serivce';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: any;

  constructor(
    private loaderService: LoaderService,
    private alert: AlertService,
    private web: WebService
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ),])
    })
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      console.log('value', this.forgotForm.value);
      this.web.postData('forgotPassword', this.forgotForm.value).then((res) => {
        if (res.status == '200') {
          this.alert.successMsg(res.error, '');
          this.forgotForm.reset();
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
