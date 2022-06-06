import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductCategoryListComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule
  ]
})
export class ProductCategoryModule { }
