import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LOGIN_URL, REGISTER_EMAIL_CHECK, REGISTER_URL } from '../API-URL/contants';
import { Globals } from '../globals';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: User;
  access: Array<any> = [];

  constructor(
    private _httpClient: HttpClient,
    private globals: Globals
  ) { }


  /**
 * Returns the current user
 */
  public getUserAccess() {
    if (this.access.length == 0) {
      this.access = JSON.parse(localStorage.getItem('access') || '[]');
    }
    return this.access;
  }

  /**
   * Returns the current user
   */
  public currentUser(): User {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    return this.user;
  }


  adminlogin(data: any): Observable<any> {

    return this._httpClient.put(LOGIN_URL, data).pipe(
      map((res: any) => {
        if (res?.data && res?.data?.result?.loggedIn) {
          localStorage.setItem('token', res?.data?.result?.loggedIn);
          localStorage.setItem('currentUser', JSON.stringify(res.data.user));

          this.globals.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          if (res.data.user.permissions != undefined) {
            localStorage.setItem('access', JSON.stringify(res.data.user.permissions));
            this.globals.currentUser['access'] = res.data.user.permissions;
          }
        }
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )

  }

  getAuthStatus(): any {
    if (localStorage.getItem('token')) {
      let token: any = localStorage.getItem('token');
      if (token) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }

  }

  registerEmailCheck(email: any): Observable<any> {
    return this._httpClient.post(REGISTER_EMAIL_CHECK, { email: email }).pipe(
      map((res: any) => {
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )
  }

  admin_Register(data: any): Observable<any> {
    let userDataKeys = Object.keys(data);
    return this._httpClient.post(REGISTER_URL, { data: data, TYPE: 'user-register', fields: userDataKeys }).pipe(
      map((res: any) => {
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )
  }


  createUserProfile(data: any): Observable<any> {
    let userDataKeys = Object.keys(data);
    return this._httpClient.post(REGISTER_URL, { data }).pipe(
      map((res: any) => {
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )
  }


}
