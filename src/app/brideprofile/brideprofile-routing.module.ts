import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrideprofilePage } from './brideprofile.page';

const routes: Routes = [
  {
    path: '',
    component: BrideprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrideprofilePageRoutingModule {}
