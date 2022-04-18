import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem('p_token', token);
  }

  public getToken(): any {
    return localStorage.getItem('p_token');
  }

  public clearToken() {
    localStorage.clear();
  }
}
