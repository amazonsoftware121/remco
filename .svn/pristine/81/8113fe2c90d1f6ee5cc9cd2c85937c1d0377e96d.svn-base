import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toaster_duration: any;
  toaster_hasIcon: boolean;
  toaster_destroyByClick: boolean;
  toaster_preventDuplicates: boolean;
  toastrService: any;

  constructor(private _snackBar: MatSnackBar) { }

  presentToast(msg: string, status: string = '') {
    this._snackBar.open(msg, "x", {
      duration: 4000,
      panelClass: status == '' ? 'toaster-msg-default' : status == 'warning' ? 'toaster-msg-warning' : 'toaster-msg-danger',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  validateEmail(email) {
    var regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regularExpression.test(email)) {
      return true;
    } else {
      return null;
    }
  }

  async validateMobileNumber(val: any) {
    var re = /^(\+\d{1,3}[- ]?)?\d{10}$/i;
    //var re = /^((00|\+)[0-9]{2,5}|0)[1-9][0-9]{7,9}$/i;
    if (re.test(val)) {
      return true;
    } else {
      return false;
    }
  }
}
