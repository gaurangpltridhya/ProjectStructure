import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable()
export class RoleAccessControl implements CanActivate {
  access: any = [];
  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('access_token') == undefined || localStorage.getItem('access_token') === '') {
      this.router.navigate(['login']);
    }
    this.access = this.auth.getUserAccess();
    var current_module = route.data['module'];
    if (current_module != '' && this.access != null) {

      if (this.access.includes(current_module)) {
        return true;
      } else {
        // TODO: add toaster here for "Not authorized to access." msg show
        this.router.navigate(['/']);
        return false;
      }
    } else {
      return true;
    }
  }
}
