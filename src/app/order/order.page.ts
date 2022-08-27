import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { UrlService } from "../service/url/url.service";

import { UserdataService } from "../service/userdata/userdata.service";

import {NavigationExtras, Router } from '@angular/router';
import { ToasterService } from "../service/toaster/toaster.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  user_info;
  my_order;
  loader_visibility: boolean = true;

  constructor(
    public http: HttpClient,
    public url: UrlService,
    public user_data: UserdataService,
    public router:Router,
    public toaster: ToasterService,   

  ) { }
  ionViewWillEnter() {

  }

  ngOnInit() {
    this.get_my_subscription_orders();
  }

  get_my_subscription_orders() {
    this.user_info = this.user_data.user_info;

    this.http
      .get(`${this.url.serverUrl}get_my_subscription_orders?user_id=${this.user_info['id']}`)
      .subscribe(
        (res) => {
          this.my_order = res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  order_detail(index){
    let order_details=this.my_order[index];
    let navExtra: NavigationExtras = {
      state: {
        order_details: order_details,
      },
    };
    this.router.navigate(["orderdetails"], navExtra);
  }

}
