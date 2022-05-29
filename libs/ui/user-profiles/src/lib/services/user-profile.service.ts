import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http : HttpClient) { }

  caculateReturns(requestObj : any) : any{
    return this.http.post<any>('https://pas-analysis-api.onrender.com/api/v1/Allocations', requestObj)
  }
  getStocks(profile : any, category :any) : any{
    return this.http.get<any>(`https://pas-analysis-api.onrender.com/api/v1/Stocks/category-and-profile/${category}/${profile}`)
  }
  rate(rating : Number,) : any{
    return this.http.post<any>(`https://pas-analysis-api.onrender.com/api/v1/Feedback?rating=${rating}`, rating)
  }
}
