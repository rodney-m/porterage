import { Component, OnInit } from '@angular/core';
import { TokenService } from '@porterage/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'porterage-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  user! :any;
  constructor(
    private tokenService: TokenService,
    private jwtHelperService : JwtHelperService, 

    ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken()
    this.user = this.jwtHelperService.decodeToken(token)
  }

  logout(){
    this.tokenService.clearToken()
    window.location.reload()
  }
}
