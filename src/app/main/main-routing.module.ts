import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAccessControl } from '../common/role-access-control/role-access-control.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './shared/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //TODO: use below code when project have multiple roles
    data: {
      module: 'dashboard'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'forms',
    component: AngularFormsComponent,
    data: {
      module: 'forms'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'charts',
    component: ChartsComponent,
    data: {
      module: 'charts'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'tables',
    component: TablesComponent,
    data: {
      module: 'tables'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'user',
    resolve:{
      user: UserResolver
    },
    component: UserComponent
    // canActivate: [RoleAccessControl],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
