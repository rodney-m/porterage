import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http : HttpClient) { }

  caculateReturns(requestObj : any) : any{
    return this.http.post<any>('https://pas-analysis-api.herokuapp.com/api/v1/Allocations', requestObj)
  }
}
