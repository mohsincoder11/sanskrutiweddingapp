import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroomprofilePageRoutingModule } from './groomprofile-routing.module';

import { GroomprofilePage } from './groomprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroomprofilePageRoutingModule
  ],
  declarations: [GroomprofilePage]
})
export class GroomprofilePageModule {}
