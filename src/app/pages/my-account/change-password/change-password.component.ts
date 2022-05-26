import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../../providers/alertService';
import { WebService } from '../../../providers/web.serivce';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswrodComponent implements OnInit {

  passwordForm: any;

  userId: any;

  userType: any;

  constructor(
    private alert: AlertService,
    private web: WebService
  ) {
    this.userId = localStorage.getItem('UserId');
    this.userType = localStorage.getItem('Role');
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.passwordForm = new FormGroup({
      role: new FormControl(''),
      userId: new FormControl(''),
      old_pass: new FormControl('', [Validators.required]),
      new_pass: new FormControl('', [Validators.required]),
      confirm_pass: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.passwordForm.get('role').setValue(this.userType);
    this.passwordForm.get('userId').setValue(this.userId);
    if (this.passwordForm.valid && (this.passwordForm.get('new_pass').value === this.passwordForm.get('confirm_pass').value) && (this.passwordForm.get('old_pass').value != this.passwordForm.get('new_pass').value)) {
      console.log('form value is', this.passwordForm.value);
      this.web.postData('changepassword', this.passwordForm.value).then((res) => {
        if (res.status == '200') {
          this.alert.successMsg(res.error, '');
          this.passwordForm.reset();
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

  onCancel() {
    this.passwordForm.reset();
  }

}
