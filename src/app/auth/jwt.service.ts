import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token: string) {
    return window.localStorage.setItem('access_token', token);
  }

  getToken() {
    return window.localStorage.getItem('access_token');
  }

  destoryToken() {
    return window.localStorage.removeItem('access_token');
  }

  isAuth(): boolean{
    return !!localStorage.getItem('access_token')
  }

  setUser(userDetails: string){
    return window.localStorage.setItem('currentUser', userDetails);
  }

}
