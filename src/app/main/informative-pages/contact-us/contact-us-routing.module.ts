import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { AddContactUsComponent } from './add-contact-us/add-contact-us.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactUsListComponent
  },
  {
    path: 'add',
    component: AddContactUsComponent
  },
  {
    path: 'edit',
    component: AddContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
