import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }
  signUp(userDetails: any): any {
    return this.http.post<any>(`https://pas-usermanagement-api.herokuapp.com/api/v1/Account/sign-up`, userDetails)
  }

  verifyAccount(accountDetails: any) {
    return this.http.post<any>(`https://pas-usermanagement-api.herokuapp.com/api/v1/Account/confirm-account`, accountDetails)   
  }
  resendOTP(email: string) {
    return this.http.get(`https://pas-usermanagement-api.herokuapp.com/api/v1/Account/sign-up/resend-otp/${email}`)   
  }
  
  login(accountDetails: any) {
    return this.http.post<any>(`https://pas-usermanagement-api.herokuapp.com/api/v1/Account/login`, accountDetails)   
  }
  
  resetPasswordSendEmail(email: any) {
    return this.http.get(`https://pas-usermanagement-api.herokuapp.com/api/v1/Account/reset-password/verification-code/${email}`)   
  }

  resetPassword(accountDetails: any) {
    return this.http.post<any>(`https://pas-usermanagement-api.herokuapp.com/api/v1/Account/reset-password`, accountDetails)   
  }
}
