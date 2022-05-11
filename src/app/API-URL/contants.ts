import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { SOCKET_URL, API_LINK, IMAGE_HOST } from './API-Url-Config';

// import { SocketIoConfig } from 'ngx-socket-io';

export const API_LINK_URL = API_LINK;
export const API_VERSION = 'api/v1'
export const COMMON = '/index';
export const ADMIN_MODULE = API_LINK + COMMON;

// authntication APIS
export const REGISTER_URL = API_LINK + '/' + API_VERSION + '/validate/user-register?lang=en';  // register url
export const LOGIN_URL = API_LINK + '/' + API_VERSION + '/auth?lang=en'; // login url
export const COUNTRY_CODE = API_LINK + '/' + API_VERSION + '/countries?lang=en'; //country pincode data get
export const REGISTER_EMAIL_CHECK = API_LINK + '/' + API_VERSION + '/profiles/email?lang=en'; //country pincode data get

// on page load calls API url list
export const BOOTSTRAP_SITE_URL = API_LINK + '/' + API_VERSION + '/bootstrap'; // get data for setup and call other APIS
export const GAMES_DATA = API_LINK + '/' + API_VERSION + '/games?lang=en&slim=true';
export const STATIC_LAN_JSON = API_LINK_URL + '/static/languages';
export const LOYALTY_LEVELS = API_LINK + '/' + API_VERSION + '/loyalty/levels?lang=en';
export const WINS = API_LINK + '/' + API_VERSION + '/wins?lang=en&limit=20&min=1';
export const JACKPOTS = API_LINK + '/' + API_VERSION + '/jackpots?currency=EUR&lang=en';

export const USER_INFO = API_LINK + '/' + API_VERSION + '/userInfo?lang=en';


@Injectable()
export class Constants {
  constructor(private httpClient: HttpClient) { }

  // roleTypes = [
  //   { "name": "Admin", "value": "admin" },
  //   { "name": "Accountant", "value": "accountant" }
  // ];

  currency = [
    { "name": "EUR", "value": "EUR" },
    { "name": "RUD", "value": "RUD" },
    { "name": "USD", "value": "USD" },
    { "name": "BYR", "value": "BYR" },
    { "name": "IQD", "value": "IQD" },
    { "name": "ET1", "value": "ET1" },
    { "name": "BC1", "value": "BC1" },
    { "name": "KRW", "value": "KRW" }
  ];

  monthsList = [
    { "name": "January", "value": "January" },
    { "name": "Febuary", "value": "Febuary" },
    { "name": "March", "value": "March" },
    { "name": "April", "value": "April" },
    { "name": "May", "value": "May" },
    { "name": "June", "value": "June" },
    { "name": "July", "value": "July" },
    { "name": "August", "value": "August" },
    { "name": "September", "value": "September" },
    { "name": "October", "value": "October" },
    { "name": "November", "value": "November" },
    { "name": "December", "value": "December" }
  ];

  datesList = this.datesPrepare();
  yearsList = this.yearsPrepare();


  datesPrepare() {
    let dates = []
    for (let i = 1; i <= 31; i++) {
      dates.push(i)
    }
    return dates;
  }

  yearsPrepare() {
    let years = []
    for (let i = 1901; i <= 2022; i++) {
      years.push(i)
    }
    return years;
  }


  /*********************************************   API Calls  ***************************************** */

  getGameSliders() {
    return this.httpClient.get("assets/frontend-json/3.swiper.config.json").pipe(
      map((res: any) => {
        return res;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
