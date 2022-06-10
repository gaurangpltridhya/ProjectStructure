import { SharedModule } from './../../shared/shared.module';
import { UserAccessListComponent } from './user-access-list/user-access-list.component';
import { UserAccessComponent } from './user-access.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccessRoutingModule } from './user-access-routing.module';


@NgModule({
  declarations: [
    UserAccessComponentponent,
    UserAccessListComponentmponent
  ],
  imports: [
    CommonModule,
    UserAccessRoutingModule,
    SharedModulele
  ]
})
export class UserAccessModule { }
