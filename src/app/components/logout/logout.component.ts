import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(
    public dialog: MatDialogRef<LogoutComponent>
  ) { }

  onSubmit() {
    this.dialog.close('ok')
  }

  onCancel() {
    this.dialog.close('cancel');
  }

}