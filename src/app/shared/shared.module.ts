import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// components
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedComponent } from './shared.component';
import { TopSliderComponent } from './top-slider/top-slider.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeGameSlidersComponent } from './home-game-sliders/home-game-sliders.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SharedComponent,
    TopSliderComponent,
    TopMenuComponent,
    HomeGameSlidersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SharedComponent,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    TopSliderComponent,
    TopMenuComponent,
    HomeGameSlidersComponent
  ]
})
export class SharedModule { }
