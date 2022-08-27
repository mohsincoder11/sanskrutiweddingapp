import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltersearchresultPageRoutingModule } from './filtersearchresult-routing.module';

import { FiltersearchresultPage } from './filtersearchresult.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltersearchresultPageRoutingModule
  ],
  declarations: [FiltersearchresultPage]
})
export class FiltersearchresultPageModule {}
