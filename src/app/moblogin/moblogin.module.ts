import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobloginPageRoutingModule } from './moblogin-routing.module';

import { MobloginPage } from './moblogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobloginPageRoutingModule
  ],
  declarations: [MobloginPage]
})
export class MobloginPageModule {}
