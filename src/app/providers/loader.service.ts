import { Injectable } from '@angular/core';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  constructor() {}

  stopLoader() {
    setTimeout(() => {
      $("#preloader").css("display", "none");
    }, 1200);
  }

}
