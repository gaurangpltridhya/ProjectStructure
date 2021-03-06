import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { LoginComponent } from './auth/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: 'http://localhost:4200',
    clientId: '352487641172-g8t283dh3et6ld96iilqdebjf740fsdo.apps.googleusercontent.com',
    scope: 'openid profile email',
    requireHttps: false,
    strictDiscoveryDocumentValidation: false
  };
  constructor(
    public dialog: MatDialog,
    private oauthService:OAuthService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.oauthService.configure(this.authCodeFlowConfig);
  }
  openDialog() {
    this.dialog.open(LoginComponent);
  }
}
