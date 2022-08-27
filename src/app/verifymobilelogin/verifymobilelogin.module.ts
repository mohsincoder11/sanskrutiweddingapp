import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifymobileloginPageRoutingModule } from './verifymobilelogin-routing.module';

import { VerifymobileloginPage } from './verifymobilelogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifymobileloginPageRoutingModule
  ],
  declarations: [VerifymobileloginPage]
})
export class VerifymobileloginPageModule {}
