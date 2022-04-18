import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './pages/container/container.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthenticationRoutingModule } from './ui-authentication.routing.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OtpComponent } from './pages/otp/otp.component';
import { TokenService } from '@porterage/core';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzModalModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzSelectModule,
  ],
  declarations: [
    ContainerComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegistrationComponent,
    OtpComponent,
  ],
  exports: [OtpComponent],
  providers: [AuthService, TokenService],
})
export class UiAuthenticationModule {}
