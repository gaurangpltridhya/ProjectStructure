import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
