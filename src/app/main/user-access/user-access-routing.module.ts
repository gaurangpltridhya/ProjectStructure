import { UserAccessListComponent } from './user-access-list/user-access-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserAccessListComponent,
    data: {
      // module: 'product-category'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'add',
    component: UserPermissionComponent,
    data: {
      // module: 'product-category'
    },
    // canActivate: [RoleAccessControl],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccessRoutingModule { }
