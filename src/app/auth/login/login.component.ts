import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private oauthService:OAuthService) { }

  ngOnInit(): void {
    
  }

  onClick(): void{
    console.log('first');
    this.oauthService.initLoginFlow();
  }
}
