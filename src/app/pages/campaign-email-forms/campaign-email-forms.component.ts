import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { CampaignCompaniesDetailesComponent } from '../campaign-contest-detailes/campaign-contest-detailes.component';


@Component({
  selector: 'app-campaign-email-forms',
  templateUrl: './campaign-email-forms.component.html',
  styleUrls: ['./campaign-email-forms.component.scss']
})
export class CampaignEmailFormsComponent implements OnInit {

  base_url:string = environment.base_url;

  title = "Animated Count";

  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;

  Companies: any;

  label: any;

  value= "hlo";
  allCompaniesDetailes: any;
  popup: any;

  constructor(private loaderService: LoaderService,private elRef: ElementRef, private web: WebService,
    private alert: AlertService,private router:Router, private dialog: MatDialog) {
    this.loaderService.stopLoader();

   }

  ngOnInit(): void {
    this.getCompanies();
    this.companiesDetails();
  }

  getCompanies() {
    this.web.getData('getAllCompanyEmailForms').then((res) => {
      if (res.status == '200') {
        this.Companies = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  openPageView(data: any){
    if(data.company_email_form_visibility == 'Fullpage'){
      this.router.navigate(['/campaign-full-view',data.web_id,data.campaign_type,data.company_email_id]);
    }else if(data.company_email_form_visibility == 'Widget'){
      this.router.navigate(['/campaign-widget-view',data.web_id,data.campaign_type,data.company_email_id]);
    }else{
      this.router.navigate(['/campaign-lightbox-view',data.web_id,data.campaign_type,data.company_email_id]);
    }
  }

  companiesDetails() {
    this.web.getData('getAllCompanies?web_id').then((res) => {
      if (res.status == '200') {
        this.allCompaniesDetailes = res.data1;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }
  
  openDialog(data1){
    const dialogRef = this.dialog.open(CampaignCompaniesDetailesComponent, {data: data1, disableClose: true,height:'310px',width:'800px'});
    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      if (sub) {
        this.label = "Submitted";
      } else {
        this.label = "Cancelled";
      }
    })
  }

  

}
