
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.page.html',
  styleUrls: ['./searchresult.page.scss'],
})
export class SearchresultPage implements OnInit {

  switchTab = 'bride';
  gender;
  user_info;
  bride_list;
  groom_list;
  loader_visibility: boolean = true;
  offset=0;
  login_user_info;


  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    public route: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,
  ) { }

  ngOnInit() {
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.switchTab = this.gender == 'Male' ? 'groom' : 'bride';
    this.login_user_info = this.user_data.user_info;

  }

  ionViewWillEnter() {
    this.get_all_profile();
  }

  get_all_profile() {
    this.user_info = this.user_data.user_info;
    this.offset=0;
    this.http
      .get(`${this.url.serverUrl}get_all_profile?id=${this.user_info['id']}&gender=${this.user_info['gender']}&offset=${this.offset}`)
      .subscribe(
        (res) => {
          this.bride_list = res['bride'];
          console.log( this.bride_list);
          this.groom_list = res['groom'];
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  send_user_interest(user_id) {
    this.loader_visibility = true;

    this.http
      .get(`${this.url.serverUrl}send_user_interest?view_user_id=${user_id}&id=${this.login_user_info.id}`)
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

  shortlist_user(user_id) {
    this.loader_visibility = true;

    this.http
      .get(`${this.url.serverUrl}shortlist_user?view_user_id=${user_id}&id=${this.login_user_info.id}`)
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
