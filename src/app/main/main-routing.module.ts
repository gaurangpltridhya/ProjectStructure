import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAccessControl } from '../common/role-access-control/role-access-control.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { UserResolver } from './shared/resolvers/user.resolver';
import { CommonElementsComponent } from './common-elements/common-elements.component';
import { DataViewComponent } from './data-view/data-view.component';
import { AgmMapComponent } from './agm-map/agm-map.component';
import { RoleAccessGuard } from './shared/guard/role-access.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
    path: 'common-elements',
    component: CommonElementsComponent,
    data: {
      module: 'common-elements'
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
    path: 'form-layouts',
    component: FormLayoutsComponent,
    data: {
      module: 'forms_layout'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'data-view',
    component: DataViewComponent,
    data: {
      module: 'data-view'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'agm-map',
    component: AgmMapComponent,
    data: {
      module: 'agm-map'
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
    path: 'product-category',
    loadChildren: () => import('./product-category/product-category.module').then(m => m.ProductCategoryModule),
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'user',
    canActivate: [RoleAccessGuard],
    resolve: {
      user: UserResolver
    },
    loadChildren: () => import('./user/userdata.module').then(m => m.UserdataModule),
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'contactUs',
    resolve: {
      user: UserResolver
    },
    loadChildren: () => import('./informative-pages/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'aboutUs',
    loadChildren: () => import('./informative-pages/about-us/about-us.module').then(m => m.AboutUsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
