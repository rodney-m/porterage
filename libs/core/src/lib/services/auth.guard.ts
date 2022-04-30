import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private tokenService:TokenService, ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const token = this.tokenService.getToken();
    console.log(token)
    
    if(token){
      const jwtHelperService = new JwtHelperService();
      console.log(jwtHelperService.decodeToken(token))
      const tokenDecode = jwtHelperService.decodeToken(token);
      if(token && !jwtHelperService.isTokenExpired(token)) return true
      // if(!this._tokenExpired(tokenDecode.exp)) return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;

  }

  // private _tokenExpired(expiration:any): boolean {
  //   return Math.floor(new Date().getTime() / 1000) >= expiration;
  // }

}
