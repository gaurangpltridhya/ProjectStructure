import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { ResponseBeanModel } from 'src/app/core/models/response-bean.model';
import { User } from 'src/app/shared/user.model';

const user = {
    name: 'aa',
    email: 'aa@gmail.com',
}

@Injectable({
  providedIn: 'root'
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
          data: {user},
      })
    // return this.makeRequest('GET', '', {});
  }

  // add/create user data
  addUser(user: User){
    this.usersData.push(user);
    this.userChanged.next(this.usersData.slice());
  }

  //get single user data
  getUser(index: number){
    return this.usersData[index];
  }

  // get user create list
  getUsersList(){
    return this.usersData.slice();
  }

  // update user data
  updateUser(index: number , newUserData: User){
    this.usersData[index] = newUserData;
    this.userChanged.next(this.usersData.slice());
  }

  // delete user data
  deleteUser(index: number){
    this.usersData.splice(index,1);
    this.userChanged.next(this.usersData.slice());
  }
}
