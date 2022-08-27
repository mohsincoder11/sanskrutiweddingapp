import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifymobileloginPage } from './verifymobilelogin.page';

const routes: Routes = [
  {
    path: '',
    component: VerifymobileloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifymobileloginPageRoutingModule {}
