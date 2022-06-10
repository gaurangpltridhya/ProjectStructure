import { UserAccessPermissionService } from './../user-access-permission.service';
// import { UserAccessPermissionService } from './../../shared/services/user-access-permission.service';
import { Subscription } from 'rxjs';
import { UserPermissionComponent } from './../user-permission/user-permission.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from './../../user/user.component';
import { UserAccessComponent } from './../user-access.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, PrimeNGConfig } from "primeng/api";
@Component({
  selector: 'app-user-access-list',
  templateUrl: './user-access-list.component.html',
  styleUrls: ['./user-access-list.component.scss']
})
export class UserAccessListComponent implements OnInit {

  permission: any[] =[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private UserAccessPermissionService: UserAccessPermissionService
    ) { }

  ngOnInit() {

    console.log('27');
    this.UserAccessPermissionService.permissionChanged.subscribe(
      (permission: any) => {
        console.log('111111111');

        
        this.permission.push(...permission);
        console.log(123,this.permission);
      }
    );
    this.UserAccessPermissionService.getPermission();
  }

  addNew(){

    this.router.navigate(['add'],{relativeTo: this.activatedRoute})
  }

}
