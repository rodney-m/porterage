import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor, TokenService, UiLoader } from '@porterage/core';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NgChartsModule } from 'ng2-charts';

//I keep the new line
registerLocaleData(en);

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getToken();
    },
    skipWhenExpired: true,
    whitelistedDomains: [],
  };
}

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    NgxUiLoaderModule.forRoot(UiLoader.load()),
    NgxUiLoaderHttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService],
      },
    }),
    NgbModule,
    NzLayoutModule,
    NzSpaceModule,
    NgChartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
