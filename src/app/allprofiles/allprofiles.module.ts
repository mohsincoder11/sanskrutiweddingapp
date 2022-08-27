import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllprofilesPageRoutingModule } from './allprofiles-routing.module';

import { AllprofilesPage } from './allprofiles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllprofilesPageRoutingModule
  ],
  declarations: [AllprofilesPage]
})
export class AllprofilesPageModule {}
