import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { TablesComponent } from './tables/tables.component';
import { ChartsComponent } from './charts/charts.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AngularFormsComponent,
    TablesComponent,
    ChartsComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
