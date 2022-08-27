import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrideprofilePageRoutingModule } from './brideprofile-routing.module';
import { BrideprofilePage } from './brideprofile.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrideprofilePageRoutingModule,
    NgxIonicImageViewerModule,
    SwiperModule
  ],
  declarations: [BrideprofilePage]
})
export class BrideprofilePageModule {}
