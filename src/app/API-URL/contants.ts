import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";

// import { SocketIoConfig } from 'ngx-socket-io';

export const API_LINK_URL = environment.baseApiURL;
export const API_VERSION = 'api/v1'
export const COMMON = '/index';
export const ADMIN_MODULE = API_LINK_URL + COMMON;

// authntication APIS
export const REGISTER_URL = API_LINK_URL + '/' + API_VERSION + '/validate/user-register';  // register url
export const LOGIN_URL = API_LINK_URL + '/' + API_VERSION + '/auth'; // login url
export const REGISTER_EMAIL_CHECK = API_LINK_URL + '/' + API_VERSION + '/verify/email'; //email verify
export const VERIFY_EMAIL_FORGOT_PASSWORD = API_LINK_URL + '/' + API_VERSION + '/verify/email'; //email verify
export const OTP_VERIFY_RESET_PASSWORD = API_LINK_URL + '/' + API_VERSION + '/otp/reset-password'; //email verify

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
