import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserAccessPermissionService {
  permissionChanged = new Subject<any[]>();


 permission: any[] = [];
  constructor() { }

addPermission(permission : any) {
  this.permission.push(permission);
  const abc = [{create: true,
    delete: true,
    edit: true,
    role: ""}]
  this.permissionChanged.next(this.permission);
}

editPermission(index: number, newPermission: any) {
  this.permission[index] = newPermission;
  this.permissionChanged.next(this.permission.slice());
}

deletePermission(index: number) {
  this.permission.splice(index, 1);
  this.permissionChanged.next(this.permission.slice());
}

getPermission(){
  return this.permission.slice();
}

}
