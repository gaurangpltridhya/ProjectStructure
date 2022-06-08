  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageSliderRoutingModule } from './image-slider-routing.module';
import { ImagesComponent } from './images/images.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ImagesComponent,
    UploadImagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImageSliderRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class ImageSliderModule { }
