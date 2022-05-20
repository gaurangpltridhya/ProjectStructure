import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { local } from 'd3';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  resolve(): any {
    return this.userService.loadUserProfile().pipe(catchError(() => {
      console.log('23');
      this.authService.logout();
      return EMPTY
    }));
  }
}
