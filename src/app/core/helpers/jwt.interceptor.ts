import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    console.log('20 interceptor');
    const currentUser: any = this.auth.currentUser();
    const token = localStorage.getItem('access_token');
    const loginCode = localStorage.getItem('loginCode');
    if (token != undefined) {
      const headers: any = { 'Authorization': `${localStorage.getItem('access_token')}` };
      // If request has FormData object Angular will automatically identify content type
      if (request.body instanceof FormData === false) {
        // body object is not FormData then force to set json content type
        headers['Content-Type'] = 'application/json';
      }
      request = request.clone({
        setHeaders: {
        Authorization:`Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
