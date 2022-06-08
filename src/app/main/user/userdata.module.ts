import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserdataRoutingModule } from './userdata-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    // UserComponent,
    AddUserComponent,
    UserListComponent,
    ViewUserComponent,
  ],
  imports: [
    CommonModule,
    UserdataRoutingModule,
    SharedModule
  ]
})
export class UserdataModule { }
