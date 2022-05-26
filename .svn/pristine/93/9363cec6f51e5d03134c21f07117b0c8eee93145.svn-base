import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-rules',
  templateUrl: './campaign-rules.component.html',
  styleUrls: ['./campaign-rules.component.scss']
})
export class CampaignRules implements OnInit {

  value:any={};

  base_url: string = environment.base_url;

  constructor(private dialog: MatDialogRef<CampaignRules>,
    @Inject(MAT_DIALOG_DATA) public data:any,private web:WebService,private alert:AlertService) {this.value = data;console.log('official rules',this.value)}

    @HostListener('document:keyup.escape') onClose() {
      this.close();
    }
  
    close() {
      this.dialog.close();
    }
    sample(data)
    {

      console.log(data);
      return 'data';
    }

  ngOnInit(): void {
  }
}
