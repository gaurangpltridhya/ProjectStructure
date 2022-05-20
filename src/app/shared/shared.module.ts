import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEditSidebarComponent } from '../common/add-edit-sidebar/add-edit-sidebar.component';
import { AddressFormatPipe } from '../common/pipes/address-format.pipe';
import { MinutesToHoursPipe } from '../common/pipes/minutes-to-hours.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    AddEditSidebarComponent,
    AddressFormatPipe,
    MinutesToHoursPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxChartsModule,
    NgbModule,
    FlatpickrModule,
    AutoCompleteModule,
    InputMaskModule,
    PaginatorModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgbModule,
    FlatpickrModule,
    AutoCompleteModule,
    InputMaskModule,
    PaginatorModule,

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddEditSidebarComponent,

    AddressFormatPipe,
    MinutesToHoursPipe
  ],
  providers: [
    NgbActiveModal
  ]
})
export class SharedModule { }
