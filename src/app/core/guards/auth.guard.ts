import { JwtService } from './../../auth/jwt.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private oauthService: OAuthService,
    private jwtService: JwtService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log('19');
    let isAuthenticated = this.authService.getAuthStatus();
    if (!isAuthenticated) {
      // console.log('22');
      return this.oauthService.loadDiscoveryDocument().then(() => {
        // console.log('24');
        return this.oauthService.tryLoginImplicitFlow(). then(() => {
          // console.log('26');
          if(this.oauthService.hasValidAccessToken()){
            // console.log('28');
            // this.jwtService.getToken
            localStorage.setItem('access_token', this.oauthService.getAccessToken());
            return true
          } else{
            console.log('32');
            localStorage.removeItem('access_token');
            this.router.navigate(['/auth/login']);
            return false
          }
        })
      });
    } else {
      console.log('36 else');
      return true;
    }
  }

}
