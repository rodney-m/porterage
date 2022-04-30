import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'porterage-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent implements OnInit {
  email : any = ''
  completeProfileForm!: FormGroup;
  accountId!: Number;
  accountFound = false;
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
  accountInfo:any = null;


  constructor(private formBuilder: FormBuilder, 
    private authService : AuthService, 
    private modalService : NzModalService, 
    private uiLoader: NgxUiLoaderService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.innitializeForm()
  }

  innitializeForm() {
    this.completeProfileForm = this.formBuilder.group({      
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      institutionName: ['', Validators.required],
    })
  }

  individualAccount(){
    this.formControls['institutionName'].disable()
  }
  instituitionAccount(){
    this.formControls['firstName'].disable()
    this.formControls['lastName'].disable()
    this.formControls['dateOfBirth'].disable()
  }

  submitForm() { 
    this.uiLoader.start()
    if (this.accountInfo.accountType === 1){
      this.authService.completeIndividualProfile({accountId: this.accountInfo.id, ...this.completeProfileForm.value})
        .subscribe((res:any) => {
          this.uiLoader.stop()
          this.modalService.create({
            nzTitle: '<i>Account Profile Completed</i>',
            nzContent: "<b> Account profile set, log in now",
            nzOnOk: () => this.router.navigateByUrl('/auth/login')         
          });
        }, (error :any) => {
          this.uiLoader.stop()
          this.modalService.error({
            nzTitle: '<i>Failed</i>',
            nzContent: "<b>Failed to complete profile try again later",    
          });
        })
      } else {
      this.authService.completeInstituitionProfile({accountId: this.accountInfo.id, ...this.completeProfileForm.value})
        .subscribe((res:any) => {
          this.uiLoader.stop()
          this.modalService.create({
            nzTitle: '<i>Account Profile Completed</i>',
            nzContent: "<b> Account profile set, log in now",
            nzOnOk: () => this.router.navigateByUrl('/auth/login')         
          });
        }, (error :any) => {
          this.uiLoader.stop()
          this.modalService.error({
            nzTitle: '<i>Failed</i>',
            nzContent: "<b>Failed to complete profile try again later",    
          });
        })

    }
  }

  findAccount(){
    this.uiLoader.start()
    this.authService.getAccountByEmail(this.email).subscribe((res:any) => {
      this.uiLoader.stop()
      this.accountInfo = res?.data
      if (this.accountInfo.accountType === 1){
        this.individualAccount()
      } else{
        this.instituitionAccount()
      }
      this.accountFound = true
    }, (error) => {
      this.uiLoader.stop()
      this.modalService.error({
        nzTitle: '<i>Error occured</i>',
        nzContent: "<b>"+error?.error?.messages[0],       
      });
      
    })
  }

  get formControls(){
    return this.completeProfileForm.controls
  }
}
