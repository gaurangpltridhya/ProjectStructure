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
export const REGISTER_URL = API_LINK + '/' + API_VERSION + '/validate/user-register';  // register url
export const LOGIN_URL = API_LINK + '/' + API_VERSION + '/auth'; // login url
export const REGISTER_EMAIL_CHECK = API_LINK + '/' + API_VERSION + '/verify/email'; //email verify
export const VERIFY_EMAIL_FORGOT_PASSWORD = API_LINK + '/' + API_VERSION + '/verify/email'; //email verify
export const OTP_VERIFY_RESET_PASSWORD = API_LINK + '/' + API_VERSION + '/otp/reset-password'; //email verify

@Injectable()
export class Constants {
  constructor(
    private httpClient: HttpClient
  ) { }

  // roleTypes = [
  //   { "name": "Admin", "value": "admin" },
  //   { "name": "Accountant", "value": "accountant" }
  // ];
}
