import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonService } from './providers/common.service';
import { LoaderService } from './providers/loader.service';
import { AlertService } from './providers/alertService';
import { WebService } from './providers/web.serivce';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    BackButtonDisableModule.forRoot(),
    NgxPayPalModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ShareButtonsModule.withConfig({
      debug:true,
    }),
    ShareIconsModule,
    // ShareButtonsModule.forRoot({
    //   // prop: {
    //   //  apiok: {
    //   //     type: 'apiok',
    //   //     text: 'Apiok',
    //   //     icon: 'fas fa-comment-alt',
    //   //     color: '#EE8208',
    //   //     share: {
    //   //       desktop: 'https://connect.ok.ru/offer?',
    //   //       metaTags: {
    //   //         url: 'url',
    //   //         title: 'title',
    //   //         image: 'imageUrl'
    //   //       },
    //   //       operators: metaTagsOperators
    //   //     },
    //   //   }
    //   // }
    // }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["zerosoft.in"]
      },
    }), 
  ],
  providers: [
    LoaderService,
    CommonService,
    AlertService,
    WebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    /*library.addIconPacks(fas, fab);
    library.addIcons(faFacebookF);
    library.addIcons(faFacebookMessenger);
    library.addIcons(faTwitter);
    library.addIcons(faWhatsapp);
    library.addIcons(faEllipsisH);*/
  }
 }
 BackButtonDisableModule.forRoot({
  preserveScrollPosition: true
})
