import { Component, OnInit } from '@angular/core';
import { UrlService } from "../service/url/url.service";
import { HttpClient } from "@angular/common/http";
import { UserdataService } from "../service/userdata/userdata.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.page.html',
  styleUrls: ['./interest.page.scss'],
})
export class InterestPage implements OnInit {
  switchTab:string = '1';
  user_info;
  loader_visibility: boolean = true;
  interest_received;
  interest_sent;
  interest_accept;

  no_sent_intrest;
  no_received_intrest;
  no_accept_intrest

  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
  }
  constructor(
    public http: HttpClient,
    public url: UrlService,
    public user_data: UserdataService,
    public toaster: ToasterService,
    public route: ActivatedRoute,

  ) { }


  ngOnInit() {
    this.switchTab=this.route.snapshot.paramMap.get('type');
    this.get_interest_data();
  }

  get_interest_data() {
    this.user_info = this.user_data.user_info;
    this.http
      .get(`${this.url.serverUrl}get_interest_data?id=${this.user_info['id']}`)
      .subscribe(
        (res) => {
          this.interest_sent = res['sent'];
          this.interest_sent.length == 0 ? this.no_sent_intrest = true : this.no_sent_intrest = false;
          this.interest_received = res['received'];
          this.interest_received.length == 0 ? this.no_received_intrest = true : this.no_received_intrest = false;
          this.interest_accept = res['accept'];
          this.interest_accept.length == 0 ? this.no_accept_intrest = true : this.no_accept_intrest = false;

          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

    
  accept_interest(id) {
    this.loader_visibility = true;
    this.http
      .get(`${this.url.serverUrl}accept_interest?view_user_id=${id}&id=${this.user_info['id']}`)
      .subscribe(
        (res) => {
          if (res['status'] == 0) {
            this.toaster.toaster_show(res['msg'], 'error', 'white');
          }
          else {
            this.toaster.toaster_show(res['msg'], 'success', 'white');
          }
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }
  
}
