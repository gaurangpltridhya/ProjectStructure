import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: {
      module: 'product'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'list',
    component: ProductListComponent,
    data: {
      module: 'product'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'add',
    component: ProductAddComponent,
    data: {
      module: 'product'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: ':id/edit',
    component: ProductAddComponent,
    data: {
      module: 'product'
    },
    // canActivate: [RoleAccessControl],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
