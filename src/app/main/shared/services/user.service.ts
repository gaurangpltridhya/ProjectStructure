import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { ResponseBeanModel } from 'src/app/core/models/response-bean.model';

const user = {
    name: 'aa',
    email: 'aa@gmail.com',
}

@Injectable({
  providedIn: 'root'
})

export class UserService extends BaseApiService {

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
}
