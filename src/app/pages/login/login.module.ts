import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from '@angular/material/tabs';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { submissionImage } from './submission-image/submission-image.component';

@NgModule({
  declarations: [
    LoginComponent,submissionImage
  ],
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatTabsModule,
    SocialLoginModule,
    CarouselModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '82709699060-qt2re6dbdt6sj7oo3c06ov00608h0o1f.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('264595878859699'),
          },
        ]
      } as SocialAuthServiceConfig,
    }    
  ],
})
  // @ts-ignore
export class LoginModule { }
