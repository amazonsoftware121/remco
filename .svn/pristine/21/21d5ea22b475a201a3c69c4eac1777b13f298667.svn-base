import { Component } from '@angular/core';
import { OwlOptions } from "ngx-owl-carousel-o";

import { WebService } from '../../providers/web.serivce';
import { LoaderService } from '../../providers/loader.service';
import { AlertService } from '../../providers/alertService';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: any;

  testimonials: any;

  base_url:string = environment.base_url;

  projects = [
    {
      id: '1',
      image: 'binancecoin.jpg'
    },
    {
      id: '2',
      image: 'bitcoin.jpg'
    },
    {
      id: '3',
      image: 'bitcoincash.jpg'
    },
    {
      id: '4',
      image: 'cardano.jpg'
    },
    {
      id: '5',
      image: 'chainlink.jpg'
    },
    {
      id: '6',
      image: 'dogecoin.jpg'
    },
    {
      id: '7',
      image: 'ethereum.jpg'
    },
    {
      id: '8',
      image: 'litecoin.jpg'
    },
    {
      id: '9',
      image: 'polkadot.jpg'
    },
    {
      id: '10',
      image: 'shishiswap.jpg'
    },
    {
      id: '11',
      image: 'solana.jpg'
    },
    {
      id: '12',
      image: 'stellar.jpg'
    },
    {
      id: '13',
      image: 'uniswap.jpg'
    }
  ]

  productOptions: OwlOptions = {
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
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: true
  }

  testimonialOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: true
  }

  blockChainOptions: OwlOptions = {
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
        items: 2
      },
      400: {
        items: 3
      },
      600: {
        items: 4
      },
      1000: {
        items: 6
      }
    },
    nav: true
  }
  contents: any;
  block_chain: any;
  gallery: any;
  image: any;
  userData: string;

  constructor(
    private loaderService: LoaderService,
    private web: WebService,
    private alert: AlertService
  ) {
    this.loaderService.stopLoader();
  }

  ngOnInit() {
    this.getProducts();
    this.getTestimonials();
    this.getContents();
    this.getBlockChain();
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

  getTestimonials() {
    this.web.getData('getAllTestimonials').then((res) => {
      if (res.status == '200') {
        this.testimonials = res.data;
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getContents() {
    this.web.getData('getAllContents').then((res) => {
      if (res.status == '200') {
        this.contents = res.data;
        console.log('plan is', this.contents[0].title);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }

  getBlockChain() {
    this.web.getData('getAllBlockChain').then((res) => {
      if (res.status == '200') {
        this.block_chain =JSON.parse(res.data[0].block_images);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      this.alert.errorMsg('Connection Error', '');
    });
  }
}