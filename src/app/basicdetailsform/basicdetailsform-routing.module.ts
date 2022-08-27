import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicdetailsformPage } from './basicdetailsform.page';

const routes: Routes = [
  {
    path: '',
    component: BasicdetailsformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicdetailsformPageRoutingModule {}
