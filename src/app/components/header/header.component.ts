import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { LogoutComponent } from '../logout/logout.component';
import { AlertService } from '../../providers/alertService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() section: any;

  isLogin: boolean;
  role: string | null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private alert: AlertService
  ) {this.role = localStorage.getItem('Role');
  console.log('this.role----->',this.role)

  }

  ngAfterContentChecked() {
    this.isLoggedIn();
  }

  readLocalStorageValue(key) {
    let value =   sessionStorage.getItem(key);
    if(value == '' || value == null) {
      value =='';
    }
    return value;
  }

  isLoggedIn() {
    const user = localStorage.getItem('UserId');
    if (user !== null && user !== '') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  onLogout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '120px',
      right: '60px'
    };
    let alert = this.dialog.open(LogoutComponent, dialogConfig);
    alert.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.alert.successMsg('Logout Successfully', '');
        setTimeout(() => {
          localStorage.clear();
          this.isLogin = false;
          this.router.navigate(['/']);
        }, 500);
      }
    });

  }

}
