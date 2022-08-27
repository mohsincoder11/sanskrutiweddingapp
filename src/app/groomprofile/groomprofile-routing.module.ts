import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroomprofilePage } from './groomprofile.page';

const routes: Routes = [
  {
    path: '',
    component: GroomprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroomprofilePageRoutingModule {}
