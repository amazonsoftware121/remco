import { CommonModule } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';

import { LoaderService } from '../../providers/loader.service';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {

  base_url: string = environment.base_url;

  Blogs: any;

  common: any;

  constructor(
    private loaderService: LoaderService,

    private web: WebService,

    private alert: AlertService,

    private router: Router,
    
  ) {
    this.loaderService.stopLoader();
  }
  openDetails(data) 
  { 
    this.router.navigate(['/blog-details', data.web_id]); 
  }

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.web.getData('getAllBlogs').then((res) => {
      if (res.status == '200') {
        this.Blogs = res.data;
        console.log('plan is', this.Blogs);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }
}
