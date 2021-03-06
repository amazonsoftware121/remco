import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../providers/loader.service';
import { environment } from 'src/environments/environment';

@Component(
  {
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss']
  }
)
export class BlogDetailsComponent {

  Blogs: any;

  base_url: string = environment.base_url;
  highlight_Blogs: any;

  constructor(
    private loaderService: LoaderService,

    private web: WebService,
 
    private alert: AlertService,

    private activateRoute: ActivatedRoute
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {

    console.log(this.activateRoute.params['_value'].id);
    this.blogsDetails(this.activateRoute.params['_value'].id);
    this.getAllBlogs();
  }

  blogsDetails(id) {
    this.web.getData('blogsDetails?web_id='+ id).then((res) => {
      if (res.status == '200') {
        this.Blogs = res.data[0];
        console.log(this.Blogs.blog_created_time);
        this.Blogs.blog_created_time = this.Blogs.blog_created_time *1000;
        console.log('time convertion', this.Blogs.blog_created_time);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  check(data: any){
    this.blogsDetails(data.web_id)
  }

  getAllBlogs() {
    this.web.getData('getAllBlogs').then((res) => {
      if (res.status == '200') {
        this.highlight_Blogs = res.data.slice(0,3);
        this.highlight_Blogs.forEach((obj) => {
        obj.blog_created_time = obj.blog_created_time *1000;
        });
        console.log('plan is', this.highlight_Blogs);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }
}
