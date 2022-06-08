import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { UserComponent } from './user/user.component';
import { CommonElementsComponent } from './common-elements/common-elements.component';
import { DataViewComponent } from './data-view/data-view.component';
import { AgmMapComponent } from './agm-map/agm-map.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    DashboardComponent,
    AngularFormsComponent,
    TablesComponent,
    ChartsComponent,
    FormLayoutsComponent,
    UserComponent,
    CommonElementsComponent,
    DataViewComponent,
    AgmMapComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    HttpClientModule,
  ]
})
export class MainModule { }
