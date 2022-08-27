import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyformPage } from './familyform.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyformPageRoutingModule {}
