import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListImageSliderComponent } from './list-image-slider/list-image-slider.component';
import { AddImageSliderComponent } from './add-image-slider/add-image-slider.component';

const routes: Routes = [
  {
    path: '',
    component: ListImageSliderComponent,
    data: {
      module: 'image-slider'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'images',
    component: ListImageSliderComponent,
    data: {
      module: 'images'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'upload-image',
    component: AddImageSliderComponent,
    data: {
      module: 'upload-image'
    },
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ImageSliderRoutingModule { }
