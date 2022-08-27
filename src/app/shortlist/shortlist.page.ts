import { Component, OnInit } from '@angular/core';
import { UrlService } from "../service/url/url.service";
import { HttpClient } from "@angular/common/http";
import { UserdataService } from "../service/userdata/userdata.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shortlist',
  templateUrl: './shortlist.page.html',
  styleUrls: ['./shortlist.page.scss'],
})
export class ShortlistPage implements OnInit {
  switchTab = '1';
  user_info;
  loader_visibility: boolean = true;
  shortlist_by_me;
  no_shortlist_by_me_interest;
  shortlist_to_me;
  no_shortlist_to_me_interest;

  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
    console.log('Segment changed', ev);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    public http: HttpClient,
    public url: UrlService,
    public user_data: UserdataService,
    public toaster: ToasterService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.get_shortlist_data();
    this.switchTab=this.route.snapshot.paramMap.get('type');
  }

  get_shortlist_data() {
    this.user_info = this.user_data.user_info;
    this.http
      .get(`${this.url.serverUrl}get_shortlist_data?id=${this.user_info['id']}`)
      .subscribe(
        (res) => {
          console.log(res);
          this.shortlist_by_me = res['by_me'];
          this.shortlist_by_me.length == 0 ? this.no_shortlist_by_me_interest = true : this.no_shortlist_by_me_interest = false;
          this.shortlist_to_me = res['to_me'];
          this.shortlist_to_me.length == 0 ? this.no_shortlist_to_me_interest = true : this.no_shortlist_to_me_interest = false;
          console.log(this.no_shortlist_to_me_interest);

          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }


}
