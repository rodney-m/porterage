import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../services/auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader'

@Component({
  selector: 'porterage-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otp = ''
  newPassword ='';
  passwordReset = false;
  newPasswordConfirm = ''
  constructor( private authService : AuthService, private activatedRoute : ActivatedRoute,private modalService : NzModalService, private router : Router, private uiLoader: NgxUiLoaderService) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams['reset']){
      this.passwordReset = true
    } else {
      this.passwordReset = false
    }
  }


  resendOtp(){
    this.uiLoader.start()
    this.authService.resendOTP(this.activatedRoute.snapshot.params['email']).subscribe((res:any)=> {
        if(res.success){
          this.uiLoader.stop()
          this.modalService.success({
            nzTitle: '<i>Verification code sent</i>',
            nzContent: '<b>Otp verification re-send was successful',          
          })
        } else {
          this.uiLoader.stop()
          this.modalService.error({
            nzTitle: '<i>Verification code re-send failed</i>',
            nzContent: '<b>Failed to resend verification code. Try again later',          
          })
        }
    })
  }

  verifyOtp(){
    if(this.passwordReset){
      this.resetPasswordVerification()
    } else {
      this.signUpVerification()
    }
  }

  resetPasswordVerification(){

    if(this.otp === '' || this.newPassword === '') {
      this.modalService.error({
        nzTitle: '<i>Fill in all fields</i>',
        nzContent: '<b>OTP field and new password field cannot be empty',       
      });
       return ;
    } else if(this.newPassword !== this.newPasswordConfirm){
      this.modalService.error({
        nzTitle: '<i>Passwords did not match</i>',
        nzContent: '<b>Confirm password value should match new password value</b>',       
      });
       return ;
    }

    this.uiLoader.start()
    this.authService.resetPassword({
      userEmail: this.activatedRoute.snapshot.params['email'],
      verificationCode: this.otp,
      newPassword : this.newPassword
    }).subscribe((res)=> {
      this.uiLoader.stop()
        if(res.success){
          this.modalService.success({
            nzTitle: '<i>Password reset successful</i>',
            nzContent: '<b>Password reset Successful. Login now',
            nzOnOk: () => this.router.navigateByUrl('/auth/login')
          
          })
          
        } else{
          this.modalService.error({
            nzTitle: '<i>Password reset Failed</i>',
            nzContent: '<b>Password reset failed re-enter details and try again',
           
          });
        }
    }, () => {
      this.uiLoader.stop()
      this.modalService.error({
        nzTitle: '<i>Verification Failed</i>',
        nzContent: '<b>Otp verification failed re-enter OTP and try again or click on resend OTP to get a new OTP',
        
      });
    })
  }

  signUpVerification(){
    if(this.otp === '') {
      this.modalService.error({
        nzTitle: '<i>Fill in verification code</i>',
        nzContent: '<b>Otp code can not be empty',       
      });
       return ;
    }
    this.authService.verifyAccount({
      email: this.activatedRoute.snapshot.params['email'],
      confirmationCode: this.otp
    }).subscribe((res)=> {
        if(res.success){
          this.modalService.success({
            nzTitle: '<i>Account Verified</i>',
            nzContent: '<b>Account verification Successful. Complete your profile now',
            nzOnOk: () => this.router.navigateByUrl('/auth/complete-profile')
          
          })
          
        } else{
          this.modalService.error({
            nzTitle: '<i>Verification Failed</i>',
            nzContent: '<b>Otp verification failed re-enter OTP and try again or click on resend OTP to get a new OTP',
           
          });
        }
    }, () => {
      this.modalService.error({
        nzTitle: '<i>Verification Failed</i>',
        nzContent: '<b>Otp verification failed re-enter OTP and try again or click on resend OTP to get a new OTP',
        
      });
    })
  }
}
