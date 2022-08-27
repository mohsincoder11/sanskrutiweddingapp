import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
@Component({
  selector: 'app-filtersearchresult',
  templateUrl: './filtersearchresult.page.html',
  styleUrls: ['./filtersearchresult.page.scss'],
})
export class FiltersearchresultPage implements OnInit {
  gender;
  user_info;
  bride_list=[];
  groom_list;
  loader_visibility: boolean = true;
  offset=0;
  login_user_info;
 
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private router: Router,

    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,
  ) {
    activatedRoute.queryParams.subscribe(async (params) => {
      if (router.getCurrentNavigation().extras.state.data) {
        this.bride_list = await router.getCurrentNavigation().extras.state
          .data;
       
        console.log(this.bride_list);
      }
    });
   }

  ngOnInit() {
    this.login_user_info = this.user_data.user_info;
    this.loader_visibility = false;


  }

  ionViewWillEnter() {
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

