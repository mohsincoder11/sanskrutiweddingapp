import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LifestyleformPageRoutingModule } from './lifestyleform-routing.module';

import { LifestyleformPage } from './lifestyleform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LifestyleformPageRoutingModule
  ],
  declarations: [LifestyleformPage]
})
export class LifestyleformPageModule {}
