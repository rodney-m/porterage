import { Component, OnInit } from '@angular/core';
import { TokenService } from '@porterage/core';

@Component({
  selector: 'porterage-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {}

  logout(){
    this.tokenService.clearToken()
    window.location.reload()
  }
}
