import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './images/images.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent,
    data: {
      module: 'image-slider'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'images',
    component: ImagesComponent,
    data: {
      module: 'images'
    },
    // canActivate: [RoleAccessControl],
  },
  {
    path: 'upload-image',
    component: UploadImagesComponent,
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
