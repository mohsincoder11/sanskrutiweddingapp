import { Component, OnInit } from '@angular/core';
import { UrlService } from "../service/url/url.service";
import { HttpClient } from "@angular/common/http";
import { UserdataService } from "../service/userdata/userdata.service";
import { ToasterService } from "../service/toaster/toaster.service";

@Component({
  selector: 'app-preference',
  templateUrl: './preference.page.html',
  styleUrls: ['./preference.page.scss'],
})
export class PreferencePage implements OnInit {
  user_info;
  loader_visibility = true;
  count;

  constructor(
    public http: HttpClient,
    public url: UrlService,
    public user_data: UserdataService,
    public toaster: ToasterService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.get_preference_page_count();
  }

  get_preference_page_count() {
    this.user_info = this.user_data.user_info;
    this.http
      .get(`${this.url.serverUrl}get_preference_page_count?id=${this.user_info['id']}`)
      .subscribe(
        (res) => {    
          this.count=res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

}
