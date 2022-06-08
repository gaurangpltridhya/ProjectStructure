import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductCategoryListComponent,
    data: {
      module: 'product-category'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'list',
    component: ProductCategoryListComponent,
    data: {
      module: 'product-category'
    },
    // canActivate: [RoleAccessControl],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    
})
export class ProductCategoryRoutingModule { }
