import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunicationformPage } from './communicationform.page';

const routes: Routes = [
  {
    path: '',
    component: CommunicationformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationformPageRoutingModule {}
