import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../services/auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader'

@Component({
  selector: 'porterage-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup
  constructor(private fb: FormBuilder, private modalService : NzModalService, private authService: AuthService,private router: Router, private uiLoader: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email : ['', [Validators.email, Validators.required]]
    })
  }


  submitForm(){
    this.uiLoader.start()
    this.authService.resetPasswordSendEmail(this.forgotPasswordForm.value.email).subscribe((res:any) => {
      this.uiLoader.stop()
      if(res.success){
        this.router.navigateByUrl(`/auth/otp/${this.forgotPasswordForm.value.email}?reset=true`)
        this.uiLoader.stop()
      } else {
        this.uiLoader.stop()
        this.modalService.error({
          nzTitle: '<i>Email Reset Failed</i>',
          nzContent: '<b>Error occured trying to send email with verification code. Make sure you entered correct email and try again',         
        });
      }
    }, () => {
      this.uiLoader.stop()
      this.modalService.error({
        nzTitle: '<i>Email Reset Failed</i>',
          nzContent: '<b>Error occured trying to send email with verification code. Make sure you entered correct email and try again',         
      });
    })
  }
}
