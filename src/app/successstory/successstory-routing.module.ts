import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessstoryPage } from './successstory.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessstoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessstoryPageRoutingModule {}
