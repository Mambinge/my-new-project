import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbPasswordAuthStrategy, NbAuthModule, NbOAuth2AuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HeaderComponent } from './pages/header/header.component';
import { AuthGuard } from './guard/auth-guard.service';
import { PagesModule } from './pages/pages.module';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    PagesModule,
    AuthRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
  name: 'oauth',

  redirect: {
    success: '/welcome/',
    failure: '', // stay on the same page
  },
  clientId: ''
}),
        NbPasswordAuthStrategy.setup({
          name: 'username',

          token: {
            class: NbAuthJWTToken,
            key: 'token'
          },

          baseEndpoint: 'http://192.168.10.91:8086',
          login: {
            redirect: {
              success: '/dashboard/',
              failure: null, // stay on the same page
            },
            endpoint: '/oauth/token',
            method: 'post',
          },

          register: {
            redirect: {
              success: '/welcome/',
              failure: null, // stay on the same page
            },
            endpoint: '/apit/auth/register',
            method: 'post',

          },
          
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',

          },

          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',

          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',

          },
          
        })
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      

      }
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
