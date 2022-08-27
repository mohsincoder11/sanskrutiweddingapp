import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltersearchresultPage } from './filtersearchresult.page';

const routes: Routes = [
  {
    path: '',
    component: FiltersearchresultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersearchresultPageRoutingModule {}
