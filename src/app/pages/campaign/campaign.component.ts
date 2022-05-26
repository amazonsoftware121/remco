import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { LoaderService } from 'src/app/providers/loader.service';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  title = "Animated Count";

  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;

  products: any;

  digitCount: any;

  base_url:string = environment.base_url;

  digit :any;

  allValue :any;
  all: any[];

  constructor(
    
    private loaderService: LoaderService,
    
    private router: Router,

    private elRef: ElementRef,

    private web: WebService,
    
    private alert: AlertService

    ) 
    {
    this.loaderService.stopLoader();
    this.getCount();
   }

   openContest(){this.router.navigate(['/campaign-contest']);}
   openEmail(){this.router.navigate(['/campaign-email-forms']);}
   openLearn(){this.router.navigate(['/campaign-learn-and-earn']);}
   openSocial(){this.router.navigate(['/campaign-social-comments']);}
   openSweep(){this.router.navigate(['/campaign-sweep-stakes']);}

  ngOnInit(): void {
    this.getCount();
    this.getProducts();
    console
  }

  animateCount() {
    let _this = this;

    let single = this.oneItem.nativeElement.innerHTML;

    this.counterFunc(single, this.oneItem, 7000);

    this.count.forEach(item => {
      _this.counterFunc(item.nativeElement.innerHTML, item, 2000);
    });
  }

  counterFunc(end: number, element: any, duration: number) {
    let range, current: number, step, timer;

    range = end - 0;
    current = 0;
    step = Math.abs(Math.floor(duration / range));

    timer = setInterval(() => {
      current += 1;
      element.nativeElement.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  getProducts() {
    this.web.getData('getAllProducts').then((res) => {
      if (res.status == '200') {
        this.products = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getCount() {
    this.web.getData('getCount').then((res) => {
      if (res.status == '200') {
        this.digit = res.data;
        console.log('digit value',this.digit);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  StrtoNum(a: any)
  {
    return Number(a)
  }

}
