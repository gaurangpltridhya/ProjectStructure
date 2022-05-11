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
export const REGISTER_EMAIL_CHECK = API_LINK + '/' + API_VERSION + '/verify/email'; //email verify



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
