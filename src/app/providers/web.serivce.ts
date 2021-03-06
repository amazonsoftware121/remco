import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  uri: string = environment.base_url + 'restapi/public/index.php/Webservices/';

  uri1: string = environment.base_url + 'restapi/public/index.php/webcompanyadmin/';

  constructor(private http: HttpClient, private _httpClient: HttpClient,private auth:AuthService) {}

  /**
 * Universal get
 *
 * @returns {Promise<any>}
 */

  // postFormData(controller:any, data: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.post(`${this.uri2}`+controller, data)
  //         .subscribe((response: any) => {
  //           if(response.status=="authentication_error"){
  //             this.auth.logout();
  //           }
  //           else{
  //             resolve(response);
  //           }
  //         },(response1: any) => {
  //           if(response1.error.status=="authentication_error"){
  //             this.auth.logout();
  //           }
  //           else{
  //             reject(response1);
  //           }
  //         });
  //   });
  // }

  getData(controller:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${this.uri}/`+controller, {
        headers:
            new HttpHeaders(
                {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            )}).subscribe((response: any) => {
              if(response.status=="authentication_error"){
                this.auth.logout();
              }
              else{
                resolve(response);
              }
      }, (response1: any) => {
        if(response1.error.status=="authentication_error"){
          this.auth.logout();
        }
        else{
          reject(response1);
        }
      });
    });
  }

  getDataAdmin(controller:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${this.uri1}/`+controller, {
        headers:
            new HttpHeaders(
                {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            )}).subscribe((response: any) => {
              if(response.status=="authentication_error"){
                this.auth.logout();
              }
              else{
                resolve(response);
              }
      }, (response1: any) => {
        if(response1.error.status=="authentication_error"){
          this.auth.logout();
        }
        else{
          reject(response1);
        }
      });
    });
  }

  /**
  * Universal post
  * @param params
  */

   postData(controller:any, data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.uri}`+controller, {...data}, {
        headers:
            new HttpHeaders(
                {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
            )
      })
          .subscribe((response: any) => {
            if(response.status=="authentication_error"){
              this.auth.logout();
            }
            else{
              resolve(response);
            }
          }, (response1: any) => {
            if(response1.error.status=="authentication_error"){
              this.auth.logout();
            }
            else{
              reject(response1);
            }
          });
    });
  }

  postDataAdmin(controller:any, data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.uri1}`+controller, {...data}, {
        headers:
            new HttpHeaders(
                {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
            )
      })
          .subscribe((response: any) => {
            if(response.status=="authentication_error"){
              this.auth.logout();
            }
            else{
              resolve(response);
            }
          }, (response1: any) => {
            if(response1.error.status=="authentication_error"){
              this.auth.logout();
            }
            else{
              reject(response1);
            }
          });
    });
  }

  downloadFile(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  // getCountries() {
  //   return this.http.get('../assets/countries.js');
  // }

  uploadWebsitePicture(uploadurl:any, body:any) {
    const url = uploadurl;
    const response = this._httpClient.post(url, body);
    return response;
  }

}
