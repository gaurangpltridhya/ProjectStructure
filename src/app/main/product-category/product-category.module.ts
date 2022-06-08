import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';



@NgModule({
  declarations: [
    ProductCategoryListComponent,
    AddProductCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule
  ]
})
export class ProductCategoryModule { }
