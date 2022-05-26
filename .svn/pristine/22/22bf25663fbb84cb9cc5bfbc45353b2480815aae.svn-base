import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { ContestFullviewGallaryVoteComponent } from './contest-fullview-gallary-vote/contest-fullview-gallary-vote.component';

@Component({
  selector: 'app-contest-fullview-gallary',
  templateUrl: './contest-fullview-gallary.component.html',
  styleUrls: ['./contest-fullview-gallary.component.scss']
})
export class ContestFullviewGallaryComponent implements OnInit {

base_url:string = environment.base_url;

image:any;
  label: string;
  social_image: any;
  userData: string;
  splite: string[];
  splite_url: string;
  splite_url1: string;
  splite1: string[];
  url_id: any;

constructor(private loaderService: LoaderService,
    private web:WebService,
    private alert:AlertService,
    private router:Router,
    private dialog: MatDialog
    ) {this.loaderService.stopLoader();
    }
      

  ngOnInit(): void {
    this.getAllimages();
    this.getAllSocialimages();
  }

  getAllimages() {
    let userId = localStorage.getItem('UserId');
    this.web.getData('getAllimages?id='+ userId).then((res) => {
      if (res.status == '200') {
        this.image = res.data;
        console.log('plan is', this.image);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getAllSocialimages() {
    this.web.getData('getAllSocialImages').then((res) => {
      if (res.status == '200') {
        this.social_image = res.data;
        console.log('plan is', this.image);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  gallery(){
    this.router.navigate(['./campaign-full-view'])
    console.log('works');
    
  }

  openDialog(data:any) {
    data=data.web_id;
    const dialogRef = this.dialog.open(ContestFullviewGallaryVoteComponent, { data: data, disableClose: true, height: '850px', width: '1280px',panelClass:'custom-model-box'});    console.log(dialogRef.afterClosed());
    dialogRef.afterClosed().subscribe((sub) => {
      if (sub) {
        this.label = "Submitted";
      } else {
        this.label = "Cancelled";
      }
    })
  }

}
