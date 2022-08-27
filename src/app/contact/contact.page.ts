import { Component, OnInit } from '@angular/core';
import { UrlService } from "../service/url/url.service";
import { HttpClient } from "@angular/common/http";
import { UserdataService } from "../service/userdata/userdata.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit {
  switchTab = '1';
  user_info;
  loader_visibility: boolean = true;
  contacted_by_me;
  no_contacted_by_me_interest;
  contacted_to_me;
  no_contacted_to_me_interest;

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
    this.switchTab=this.route.snapshot.paramMap.get('type');
    this.get_contacted_data();
  }

  get_contacted_data() {
    this.user_info = this.user_data.user_info;
    this.http
      .get(`${this.url.serverUrl}get_contacted_data?id=${this.user_info['id']}`)
      .subscribe(
        (res) => {
          this.contacted_by_me = res['by_me'];
          this.contacted_by_me.length == 0 ? this.no_contacted_by_me_interest = true : this.no_contacted_by_me_interest = false;
          this.contacted_to_me = res['to_me'];
          this.contacted_to_me.length == 0 ? this.no_contacted_to_me_interest = true : this.no_contacted_to_me_interest = false;
          console.log(this.no_contacted_to_me_interest);

          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }


}
