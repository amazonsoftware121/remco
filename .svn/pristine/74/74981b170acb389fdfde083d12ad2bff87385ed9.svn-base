import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import referralCodeGenerator from 'referral-code-generator'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-video-resources-video',
  templateUrl: './video-resources-video.component.html',
  styleUrls: ['./video-resources-video.component.scss']
})
export class videoResourceModelComponent implements OnInit {

  constructor(private spinnerService:NgxSpinnerService,private dialog: MatDialogRef<videoResourceModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private web:WebService,private alert:AlertService) 
    {
    }
    @HostListener('document:keyup.escape') onClose() {
      this.close();
    }
  
    close() {
      this.dialog.close();
    }

  ngOnInit(): void {
  }
}
