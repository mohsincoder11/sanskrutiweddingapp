import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicdetailsformPageRoutingModule } from './basicdetailsform-routing.module';

import { BasicdetailsformPage } from './basicdetailsform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicdetailsformPageRoutingModule
  ],
  declarations: [BasicdetailsformPage]
})
export class BasicdetailsformPageModule {}
