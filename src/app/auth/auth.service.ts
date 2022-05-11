import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BOOTSTRAP_SITE_URL, COUNTRY_CODE, GAMES_DATA, JACKPOTS, LOGIN_URL, LOYALTY_LEVELS, REGISTER_EMAIL_CHECK, REGISTER_URL, STATIC_LAN_JSON, USER_INFO, WINS } from '../API-URL/contants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  adminlogin(data: any): Observable<any> {

    return this._httpClient.put(LOGIN_URL, data).pipe(
      map((res: any) => {
        if (res?.data && res?.data?.result?.loggedIn) {
          localStorage.setItem('token', res?.data?.result?.loggedIn);
          // localStorage.setItem('currentUser', JSON.stringify(res.data.user));

          // this.globals.currentUser = JSON.parse(localStorage.getItem('currentUser'));;
          // if (res.data.user.permissions != undefined) {
          //     localStorage.setItem('access', JSON.stringify(res.data.user.permissions));
          //     this.globals.currentUser['access'] = res.data.user.permissions;
          // }
        }
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )

    // return this.http.put<any>(this.loginUrl, data );
    //        {headers:this.requestHeader}


  }

  getAuthStatus(): any {
    if (localStorage.getItem('token')) {
      let login: any = localStorage.getItem('token');
      if (login == 1) {
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

  getCountry_code(): Observable<any> {

    return this._httpClient.get(COUNTRY_CODE, {}).pipe(
      map((res: any) => {
        if (res.data && res.data.token) {
        }
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )
  }

  /************************  main page load calls APIS start  ************************/

  /**
   * return data which used for call other API by used this res data
   * @returns 
   */
  bootstrapData() {
    return this._httpClient.get(BOOTSTRAP_SITE_URL, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        // return throwError(error)
        return throwError(() => new Error(error))
      })
    )
  }


  /**
   * get games data for main page on load
   * @returns 
   */
  gamesData() {
    return this._httpClient.get(GAMES_DATA, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        // return throwError(error)
        return throwError(() => new Error(error))
      })
    )
  }

  /**
   * get language json data 
   * @returns 
   */
  lanStaticJsonData(language: string) {
    return this._httpClient.get(STATIC_LAN_JSON + '/' + language + '.json', {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        // return throwError(error)
        return throwError(() => new Error(error))
      })
    )
  }


  /**
  * get loyality level data for main page on load
  * @returns 
  */
  loyalityLevelData() {
    return this._httpClient.get(LOYALTY_LEVELS, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        // return throwError(error)
        return throwError(() => new Error(error))
      })
    )
  }

  /**
* get wins data for main page on load
* @returns 
*/
  winsData() {
    return this._httpClient.get(WINS, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        // return throwError(error)
        return throwError(() => new Error(error))
      })
    )
  }


  /**
* get jackot currency data for main page on load
* @returns 
*/
  jackpotCurrencyData() {
    return this._httpClient.get(JACKPOTS, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        // return throwError(error)
        return throwError(() => new Error(error))
      })
    )
  }


  userInfoData(): Observable<any> {
    return this._httpClient.get(USER_INFO, {}).pipe(
      map((res: any) => {
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )
  }


  /************************  main page load calls APIS end  ************************/

}
