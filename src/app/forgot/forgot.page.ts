import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  loader_visibility: boolean = false;
  mobile_error: boolean = false;
  constructor(
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public router: Router
  ) { }

  ngOnInit() {
  }



  send_otp(formdata: NgForm) {
    formdata.value.mobile && (formdata.value.mobile.toString()).length == 10 ? this.mobile_error = false : this.mobile_error = true;
    if (formdata.value.mobile && formdata.value.mobile.toString().length == 10) {
      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}send_otp`, formdata.value)
        .subscribe(
          (res: any) => {
            this.loader_visibility = false;
            if (res == 0)
              this.toaster.toaster_show('This mobile number is not registered with us.', 'error', 'white');
            else {
              this.toaster.toaster_show('OTP sent on your given mobile number.', 'success', 'white');
              this.router.navigate(['/otp/' + formdata.value.mobile + '/' + res]);
              formdata.resetForm();

            }

          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          }
        );
    }
  }

}
