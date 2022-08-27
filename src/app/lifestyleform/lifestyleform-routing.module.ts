import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifestyleformPage } from './lifestyleform.page';

const routes: Routes = [
  {
    path: '',
    component: LifestyleformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifestyleformPageRoutingModule {}
