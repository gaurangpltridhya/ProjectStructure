import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { AddContactUsComponent } from './add-contact-us/add-contact-us.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ContactUsListComponent,
    AddContactUsComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    SharedModule
  ]
})
export class ContactUsModule { }
