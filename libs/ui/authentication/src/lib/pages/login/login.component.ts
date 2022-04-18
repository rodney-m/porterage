import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { TokenService } from '@porterage/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'porterage-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login! : FormGroup
  constructor(private formBuilder : FormBuilder, private tokenService : TokenService,private modalService : NzModalService, private uiLoader: NgxUiLoaderService, private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required]]
    })
  }

  submitForm(){
    if(this.login.invalid){
      this.modalService.error({
        nzTitle: '<i>Form details invalid</i>',
        nzContent: '<b>Form details invalid, check if you entered correct email format',
       
      });
      return;
    }
    this.uiLoader.start()
    this.authService.login(this.login.value).subscribe((res) => {
      if(res.success){
        this.router.navigateByUrl('/')
        this.tokenService.setToken(res?.data?.token)
        this.uiLoader.stop()
      } else {
        this.uiLoader.stop()
        this.modalService.error({
          nzTitle: '<i>Login Failed</i>',
          nzContent: '<b>Error occured trying to login. Make sure you entered correct details and try again',         
        });
      }
    }, () => {
      this.uiLoader.stop()
      this.modalService.error({
        nzTitle: '<i>Login Failed</i>',
        nzContent: '<b>Error occured trying to login. Make sure you entered correct details and try again',         
      });
    })
  }
}
