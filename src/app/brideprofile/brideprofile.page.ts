import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import * as $ from 'jquery';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-brideprofile',
  templateUrl: './brideprofile.page.html',
  styleUrls: ['./brideprofile.page.scss'],
})
export class BrideprofilePage implements OnInit {

  user_id;
  slideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 500,
    loop:true,
  };
  loader_visibility: boolean = true;
  user_info;
  login_user_info;
  switchTab = 'basic';
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
    public router: Router,
    public modalController: ModalController,


  ) { }
  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('id');
    this.login_user_info = this.user_data.user_info;
    this.get_current_user_info();
  }

  ionViewWillEnter() {
  }
 

  get_current_user_info() {
    this.http
      .get(`${this.url.serverUrl}get_current_user_info?view_user_id=${this.user_id}&id=${this.login_user_info.id}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          this.user_info = res;
          console.log(res);
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  send_user_interest() {
    this.loader_visibility = true;

    this.http
      .get(`${this.url.serverUrl}send_user_interest?view_user_id=${this.user_id}&id=${this.login_user_info.id}`)
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

  shortlist_user() {
    this.loader_visibility = true;

    this.http
      .get(`${this.url.serverUrl}shortlist_user?view_user_id=${this.user_id}&id=${this.login_user_info.id}`)
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

  contact_user() {
    this.loader_visibility = true;

    this.http
      .get(`${this.url.serverUrl}contact_user?view_user_id=${this.user_id}&id=${this.login_user_info.id}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;

          if (res['status'] == 0) {
            this.toaster.toaster_show(res['msg'], 'error', 'white');
          }
          else {
            this.open_query_modal();
          //  this.toaster.toaster_show(res['msg'], 'success', 'white');
          }
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  open_query_modal() {
    $("#query_modal").removeClass("hide");
    $("#query_modal").addClass("show");
  }

  close_modal() {
    $("#query_modal").addClass("hide");
  }



 

}
