import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChipsModule } from 'primeng/chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from 'primeng/paginator';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';

// components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEditSidebarComponent } from '../common/add-edit-sidebar/add-edit-sidebar.component';

// pipes
import { AddressFormatPipe } from '../common/pipes/address-format.pipe';
import { MinutesToHoursPipe } from '../common/pipes/minutes-to-hours.pipe';

//directives
import { CustomTooltipDirective } from '../common/custom-tooltip/custom-tooltip.directive';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    AddEditSidebarComponent,
    AddressFormatPipe,
    MinutesToHoursPipe,
    CustomTooltipDirective
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
    PaginatorModule,
    ChipsModule,
    NgSelectModule,
    SliderModule,
    SelectButtonModule
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
    ChipsModule,
    NgSelectModule,
    SliderModule,
    SelectButtonModule,

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddEditSidebarComponent,
    CustomTooltipDirective,

    AddressFormatPipe,
    MinutesToHoursPipe
  ],
  providers: [
    NgbActiveModal
  ]
})
export class SharedModule { }
