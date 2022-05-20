import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private oauthService: OAuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAuthenticated = this.authService.getAuthStatus();
      if (isAuthenticated || this.oauthService.hasValidAccessToken()) {
        console.log('20 if');
        this.router.navigate(['/']);
        return false;
      } else {
        console.log('22 else');
        return true;
      }
  }
  
}
