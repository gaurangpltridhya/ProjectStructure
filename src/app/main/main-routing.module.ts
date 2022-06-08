import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAccessControl } from '../common/role-access-control/role-access-control.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './shared/resolvers/user.resolver';
import { CommonElementsComponent } from './common-elements/common-elements.component';
import { DataViewComponent } from './data-view/data-view.component';
import { AgmMapComponent } from './agm-map/agm-map.component';
import { ImagesComponent } from './image-slider/images/images.component';
import { UploadImagesComponent } from './image-slider/upload-images/upload-images.component';

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
    path: 'image-slider',
    loadChildren: () => import('./image-slider/image-slider.module').then(m => m.ImageSliderModule),
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'product-category',
    loadChildren: () => import('./product-category/product-category.module').then(m => m.ProductCategoryModule),
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'user',
    resolve: {
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
