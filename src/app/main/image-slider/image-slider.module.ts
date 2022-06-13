  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageSliderRoutingModule } from './image-slider-routing.module';
import { ListImageSliderComponent } from './list-image-slider/list-image-slider.component';
import { AddImageSliderComponent } from './add-image-slider/add-image-slider.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListImageSliderComponent,
    AddImageSliderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImageSliderRoutingModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class ImageSliderModule { }
