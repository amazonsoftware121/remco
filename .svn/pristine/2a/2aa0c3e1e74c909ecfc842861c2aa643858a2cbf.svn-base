import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoaderService } from '../../../providers/loader.service';
import { AlertService } from '../../../providers/alertService';
import { WebService } from '../../../providers/web.serivce';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordForm: any;

  constructor(
    private loaderService: LoaderService,
    private alert: AlertService,
    private activateRoute: ActivatedRoute,
    private web: WebService,
    private router: Router
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.buildForm();
    this.activateRoute.queryParamMap.subscribe((obj: any) => {
      console.log('parmas', obj.params.v_token);
      this.passwordForm.get('token').setValue(obj.params.v_token);
    });
  }

  buildForm() {
    this.passwordForm = new FormGroup({
      token: new FormControl(''),
      new_pass: new FormControl('', [Validators.required]),
      confirm_pass: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.passwordForm.valid && (this.passwordForm.get('new_pass').value === this.passwordForm.get('confirm_pass').value)) {
      console.log('value', this.passwordForm.value);
      this.web.postData('resetPassword', this.passwordForm.value).then((res) => {
        if (res.status == '200') {
          this.alert.successMsg(res.error, '');
          localStorage.setItem('UserDetails', JSON.stringify(res.data));
          localStorage.setItem('UserId', res.data.web_id);
          localStorage.setItem('Role', res.role);
          this.router.navigate(['/my-account']);
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
