import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessstoryPageRoutingModule } from './successstory-routing.module';

import { SuccessstoryPage } from './successstory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessstoryPageRoutingModule
  ],
  declarations: [SuccessstoryPage]
})
export class SuccessstoryPageModule {}
