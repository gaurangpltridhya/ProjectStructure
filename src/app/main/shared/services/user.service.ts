import { throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, map } from 'rxjs';
import { USER_DATA_LIST, USER_REGISTER_URL } from 'src/app/API-URL/contants';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { ResponseBeanModel } from 'src/app/core/models/response-bean.model';
import { User } from 'src/app/shared/user.model';

const user = {
  name: 'aa',
  email: 'aa@gmail.com',
};

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService {
  userChanged = new Subject<User[]>();
  usersData: User[] = [];

  constructor(http: HttpClient) {
    super(http);
  }

  loadUserProfile(): Observable<ResponseBeanModel> {
    return of({
      success: true,
      data: { user },
    });
    // return this.makeRequest('GET', '', {});
  }

  // add/create user data
  addUser(user: User) {
    return this.makeRequest('POST', USER_REGISTER_URL, user);
  }

  //get single user data
  getUser(index: any) {
    return this.makeRequest('GET',USER_DATA_LIST+`/${index}`);
  }

  // get user create list
  getUsersList() {
    return this.makeRequest('GET', USER_DATA_LIST);
  }

  // get user create list page
  getUsersPageList(dtParams: any, dtSearch: any, type: any){
    dtParams['search'] = dtSearch
    return this.http.post(USER_DATA_LIST, dtParams).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(error => {
        this.commonErrorHandler(error.error.status);
        return throwError(error);
      })
    )
  }

  commonErrorHandler(errorStatus: any) {
    if (errorStatus === 401) {
      // this.authenticationService.logout();
    }
  }

  // update user data
  updateUser(index: any, body: any) {
    return this.makeRequest('PUT',USER_DATA_LIST+`/${index}`,body);
  }

  // delete user data
  deleteUser(index: string) {
    return this.makeRequest('DELETE',USER_DATA_LIST+`/${index}`)
  }
}
