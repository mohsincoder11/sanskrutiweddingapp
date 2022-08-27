import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyformPageRoutingModule } from './familyform-routing.module';

import { FamilyformPage } from './familyform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyformPageRoutingModule
  ],
  declarations: [FamilyformPage]
})
export class FamilyformPageModule {}
