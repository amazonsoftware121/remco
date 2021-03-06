import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {

  Testimonials: any;

  base_url: string = environment.base_url;

  constructor(
    private loaderService: LoaderService,
    private web: WebService,
    private alert: AlertService
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.getAllTestimonials();
  }

  getAllTestimonials() {
    this.web.getData('getAllTestimonials').then((res) => {
      if (res.status == '200') {
        this.Testimonials = res.data;
        console.log('plan is', this.Testimonials);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

}
