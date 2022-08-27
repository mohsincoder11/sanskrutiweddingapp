import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerandeducationformPageRoutingModule } from './careerandeducationform-routing.module';

import { CareerandeducationformPage } from './careerandeducationform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerandeducationformPageRoutingModule
  ],
  declarations: [CareerandeducationformPage]
})
export class CareerandeducationformPageModule {}
