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

  // usersData: User[] = [
  //   {confirmPassword: "112233",
  //   email: "mukund@gmail.com",
  //   firstName: "Mukund",
  //   lastName: "Dholariya",
  //   mobile: "9874563210",
  //   password: "112233",
  //   role: "Admin"},

  //   {confirmPassword: "112233",
  //   email: "yash@gmail.com",
  //   firstName: "Yash",
  //   lastName: "Bharadva",
  //   mobile: "9874563211",
  //   password: "112233",
  //   role: "User"}
  // ];

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
    // this.usersData.push(user);
    // this.userChanged.next(this.usersData.slice());
  }

  //get single user data
  getUser(index: number) {
    return this.usersData[index];
  }

  // get user create list
  getUsersList() {
    return this.makeRequest('GET', USER_DATA_LIST);
    // return this.usersData.slice();
  }

  // update user data
  updateUser(index: number, newUserData: User) {
    this.usersData[index] = newUserData;
    this.userChanged.next(this.usersData.slice());
  }

  // delete user data
  deleteUser(index: number) {
    return this.makeRequest('DELETE',USER_DATA_LIST+`/${index}`)
    // this.usersData.splice(index, 1);
    // this.userChanged.next(this.usersData.slice());
  }
}
