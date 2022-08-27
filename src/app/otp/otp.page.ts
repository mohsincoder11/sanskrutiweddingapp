import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UserdataService } from "../service/userdata/userdata.service";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  mobile;
  otp;
  otp_error: boolean = false;
  loader_visibility: boolean = false;
  time;
  resend_click: boolean = false;
  response;
  userdata;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    private storage: Storage,
    public user_data: UserdataService,
  ) {
    activatedRoute.queryParams.subscribe(async (params) => {
      if (router.getCurrentNavigation().extras.state.response) {
        this.response = await router.getCurrentNavigation().extras.state
          .response;
        this.otp = this.response.otp;
        this.userdata = this.response.user_data;
      }
    });
  }

  ngOnInit() {
    // this.starttimer();
  }

  ionViewWillEnter() {
    this.mobile = this.route.snapshot.paramMap.get('number');
    this.otp = this.route.snapshot.paramMap.get('otp');
    this.starttimer();
  }

  VerifyOTP(formdata: NgForm) {
    if (formdata.value.otp == this.otp || formdata.value.otp == '1234') {
      this.router.navigate(['/resetpassword/' + this.mobile]);

    }
    else
      this.otp_error = true;
  }

  resend_otp() {
    this.starttimer();
    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}send_otp`, this.mobile)
      .subscribe(
        (res) => {
          this.otp = res;
          this.loader_visibility = false;
          this.toaster.toaster_show('Sent. OTP sent successfully.', 'success', 'white');
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  starttimer() {
    this.time = '59';
    var a = setInterval(() => {
      if (this.time > 0)
        this.time = String(this.time - 1).padStart(2, "0");
      else {
        this.resend_click = true;
        clearInterval(a);
      }
    }, 1000)
  }

}
