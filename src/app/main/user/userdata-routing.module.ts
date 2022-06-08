import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'edit/:id', component: AddUserComponent },
  { path: 'view/:id', component: ViewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserdataRoutingModule {}
