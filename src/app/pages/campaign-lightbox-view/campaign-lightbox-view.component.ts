import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { CampaignLightboxViewFormComponent } from './campaign-lightbox-view-form/campaign-lightbox-view-form.component';

@Component({
  selector: 'app-campaign-lightbox-view',
  templateUrl: './campaign-lightbox-view.component.html',
  styleUrls: ['./campaign-lightbox-view.component.scss']
})
export class CampaignLightboxViewComponent implements OnInit {
  value= "hlo";

  label: any;

  view :any;

  view1 :any;

  fields :any;

  modal:any;

  mail:any;

  constructor(
    
    private loaderService: LoaderService,
    
    private router: Router,

    private dialog: MatDialog,

    private activateRoute : ActivatedRoute,

    private web :WebService,

    private alert : AlertService
    )
    {

      this.loaderService.stopLoader();

      this.formVisiblity(this.activateRoute.params['_value'].id,this.activateRoute.params['_value'].id1);

      this.preEntryForm(this.activateRoute.params['_value'].id2,this.activateRoute.params['_value'].id1);

      this.getEmail(this.activateRoute.params['_value'].id2);

    }

    ngOnInit() {
      setTimeout(() => {
        this.openDialog(this.view);
      }, 1000);
    }

   formVisiblity(id,id1) {
    this.web.getData('getAllCompaniesId?web_id='+ id + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        this.view = res.data[0];
        this.view1 = [
          {
            id: '1',
            image: this.view.company_product_images_slide1
          },
          {
            id: '2',
            image: this.view.company_product_images_slide2
          },
          {
            id: '3',
            image: this.view.company_product_images_slide3
          }
        ]
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
   }

   getEmail(id2) {
    this.web.getData('getEmail?company_id='+ id2).then((res) => {
      if (res.status == '200') {
        this.mail = res.data[0];
        console.log('MAIL',this.mail);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

   preEntryForm(id2,id1) {
    this.web.getData('getAllCompanyEntryFields?company_id='+ id2 + '&campaign_type='+ id1 ).then((res) => {
      if (res.status == '200') {
        this.fields = res.data[0];
        console.log('FIELDS GETED SUCCUSSFULLY',this.fields);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  openDialog(modal) {
    modal.view = this.view;
    modal.view1 = this.view1;
    modal.fields = this.fields;
    modal.mail = this.mail;
    console.log('MODAL',modal);
    const dialogRef = this.dialog.open(CampaignLightboxViewFormComponent, {data : modal, disableClose: true,height:'700px',width:'800px'});
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
