import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
  order_details;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,

  ) {
    activatedRoute.queryParams.subscribe(async (params) => {
      if (router.getCurrentNavigation().extras.state.order_details) {
        this.order_details = await router.getCurrentNavigation().extras.state.order_details;
        console.log(this.order_details);
      }
    });

  }

  ngOnInit() {
  }

}
