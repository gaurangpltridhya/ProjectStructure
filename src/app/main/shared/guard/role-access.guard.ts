import { JwtService } from './../../../auth/jwt.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleAccessGuard implements CanActivate {
  userRole: any;

  constructor(private jwtService: JwtService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      this.userRole = localStorage.getItem('currentUser');
      this.userRole = JSON.parse(this.userRole).role;
      if(this.userRole == 'Admin'){
        return true;
      }
      else{
        this.router.navigate(['/dashboard']);
        return false;
      }
  }
}
