import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Constants } from './API-URL/contants';
import { SharedModule } from './shared/shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AgmCoreModule } from '@agm/core';

import { Globals } from './globals';
import { RoleAccessControl } from './common/role-access-control/role-access-control.service';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ImagesComponent } from './main/images/images.component';
import { UploadImagesComponent } from './main/upload-images/upload-images.component';


@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    UploadImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    OAuthModule.forRoot(),
    FlatpickrModule.forRoot(),
    AgmCoreModule.forRoot({
      // apiKey: GOOGLE_API_KEY
    })
  ],
  exports: [

  ],
  providers: [
    Constants,
    Globals,
    RoleAccessControl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
