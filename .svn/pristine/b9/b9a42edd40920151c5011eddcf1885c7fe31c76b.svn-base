import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-contest-detailes',
  templateUrl: './campaign-contest-detailes.component.html',
  styleUrls: ['./campaign-contest-detailes.component.scss']
})
export class CampaignCompaniesDetailesComponent implements OnInit {

  value:any={};

  base_url: string = environment.base_url;
  valid_profile: any;

  constructor(private dialog: MatDialogRef<CampaignCompaniesDetailesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private web:WebService,private alert:AlertService) {this.value = data,this.valid_profile=this.value.profile;console.log('profile',this.valid_profile)
    }

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
