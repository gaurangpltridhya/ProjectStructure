import { AddAboutUsComponent } from './add-about-us/add-about-us.component';
import { AboutUsListComponent } from './about-us-list/about-us-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AboutUsListComponent
  },
  {
    path: 'add',
    component: AddAboutUsComponent
  },
  {
    path: 'edit',
    component: AddAboutUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
