import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  pushNotification = new Subject<any>();

  constructor() { }



  /**
   * update notification
   */
  updateNotification(notify: any) {
    this.pushNotification.next(notify);
  }
}
