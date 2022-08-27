import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobloginPage } from './moblogin.page';

const routes: Routes = [
  {
    path: '',
    component: MobloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobloginPageRoutingModule {}
