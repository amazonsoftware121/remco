import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';
import { ContestFullviewGallaryVoteComponent } from '../../contest-fullview-gallary/contest-fullview-gallary-vote/contest-fullview-gallary-vote.component';

@Component({
  selector: 'app-submission-image',
  templateUrl: './submission-image.component.html',
  styleUrls: ['./submission-image.component.scss']
})
export class submissionImage implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: true
  };

  value:any={};

  base_url: string = environment.base_url;
  submission_image: any;
  loading: boolean=false;

  constructor(private dialog: MatDialogRef<submissionImage>,private router: Router,private dialog1:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,private web:WebService,private alert:AlertService) {this.value=data;console.log(this.value);
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
    login(){
      this.dialog.close();
      this.router.navigate(['/login/login']);
    }

  ngOnInit(): void {
    this.getSubmissionImage();
  }
  getSubmissionImage(){
    let data={
      submission_id:this.value
    }
    this.web.postData('getSubmissionImage',data).then((res)=>{
      if(res.status='200'){
        this.submission_image=res.data;
        console.log('----------->',this.submission_image);

      }else{
          this.loading = false;
          this.alert.errorMsg('', res.error);
        }
    })
  }

  openVoting(data:any) {
    data.web_id=data.web_id;
    data.campaign_id=this.submission_image.campaign_id;
    console.log('data',data);
    const dialogRef = this.dialog1.open(ContestFullviewGallaryVoteComponent, { data: data, disableClose: true, height: '650px', width: '980px',panelClass:'custom-model-box'});    console.log(dialogRef.afterClosed());
  }
}
