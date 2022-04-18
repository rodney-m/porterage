import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../services/auth.service';
import  {NgxUiLoaderService} from 'ngx-ui-loader'

@Component({
  selector: 'porterage-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  signUpForm!: FormGroup;
  accountTypes = [
    {
      type: 'Individual',
      id: 1
    },
    {
      type: 'Instituition',
      id: 2
    },

  ]
  otp! : string;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private modalService : NzModalService, private router: Router, private uiLoader: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  signUp(){    
    this.uiLoader.start()
    if ((this.formControls['password'].value === this.formControls['confirmPassword'].value) && this.signUpForm.valid){
      this.authService.signUp(this.signUpForm.value).subscribe((response:any) => {
        if (response.success === true){
            // this.modalService.create({
            //   nzTitle: 'Enter OTP sent to your email',
            //   nzContent: OtpComponent,
            // });
            this.uiLoader.stop()
            this.router.navigateByUrl(`/auth/otp/${this.signUpForm.value.email}`)
            
        }

        if (response.success === false){
          this.uiLoader.stop()
          this.modalService.confirm({
            nzTitle: 'Registration failed',
            nzContent: response.messages[0],
            nzOkText: 'OK',
          });
        }
      }, (error : any)=> {
        this.uiLoader.stop()
          this.modalService.confirm({
            nzTitle: 'Registration failed',
            nzContent: 'Registration failed try again later!',
            nzOkText: 'OK',
          });
      })

    }
  }

  get formControls(){
    return this.signUpForm.controls
  }
}
