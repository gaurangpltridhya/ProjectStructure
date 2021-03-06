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
import { ToastrModule } from 'ngx-toastr';
import { UtilityService } from './common/utility.service';
import { CustomConfirmationPopupComponent } from './common/custom-confirmation-popup/custom-confirmation-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomConfirmationPopupComponent
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
    }),
    ToastrModule.forRoot()
  ],
  exports: [

  ],
  providers: [
    Constants,
    Globals,
    RoleAccessControl,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
