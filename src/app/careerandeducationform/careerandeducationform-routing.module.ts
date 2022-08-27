import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerandeducationformPage } from './careerandeducationform.page';

const routes: Routes = [
  {
    path: '',
    component: CareerandeducationformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerandeducationformPageRoutingModule {}
