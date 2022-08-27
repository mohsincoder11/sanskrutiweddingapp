import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllprofilesPage } from './allprofiles.page';

const routes: Routes = [
  {
    path: '',
    component: AllprofilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllprofilesPageRoutingModule {}
