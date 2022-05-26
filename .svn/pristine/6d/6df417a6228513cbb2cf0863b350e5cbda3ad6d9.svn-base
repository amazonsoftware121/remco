import { Component } from '@angular/core';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';

import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  faqs: any;

  showAns:boolean = false;

  quesId: any;

  constructor(
    private loaderService: LoaderService,
    private web: WebService,
    private alert: AlertService
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.getAllfaq();
  }

  openAnswerBox(id) {
    if (this.quesId == id && this.showAns) {
      this.showAns = false;
      this.quesId = id;
    } else {
      this.quesId = id;
      this.showAns = true;
    }
  }

  getAllfaq() {
    this.web.getData('getAllfaq').then((res) => {
      if (res.status == '200') {
        this.faqs = res.data;
        console.log('plan is', this.faqs);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }
}
