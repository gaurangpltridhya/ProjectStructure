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
import { UserAccessComponent } from './user-access/user-access.component';
import { UserPermissionComponent } from './user-access/user-permission/user-permission.component';
import { UserAccessListComponent } from './user-access/user-access-list/user-access-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';


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
    AgmMapComponent,
    UserAccessComponent,
    UserPermissionComponent,
    UserAccessListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    ]
})
export class MainModule { }
