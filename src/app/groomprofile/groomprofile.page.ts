import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";

@Component({
  selector: 'app-groomprofile',
  templateUrl: './groomprofile.page.html',
  styleUrls: ['./groomprofile.page.scss'],
})
export class GroomprofilePage implements OnInit {
  user_id;
  slideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 500,
  };
  loader_visibility:boolean=true;
  user_info;
  switchTab = 'basic';
  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
    console.log('Segment changed', ev);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    public route: ActivatedRoute,
    public http: HttpClient,
    public url:UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,
  ) { }
  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('id');
    this.get_current_user_info();

    console.log(this.user_id);
  }

  ionViewWillEnter() {
  }

  get_current_user_info() {
    this.http
      .get(`${this.url.serverUrl}get_current_user_info?id=${this.user_id}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          this.user_info=res;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

}
