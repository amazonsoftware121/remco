import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next){
    let headerIntercept = req.clone({
      setHeaders:{
        SiteAuth:'testing'
      }
    })

    return next.handle(headerIntercept);
  }
}
