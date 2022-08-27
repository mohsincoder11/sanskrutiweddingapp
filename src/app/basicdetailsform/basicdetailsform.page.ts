import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { Storage } from '@ionic/storage';
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basicdetailsform',
  templateUrl: './basicdetailsform.page.html',
  styleUrls: ['./basicdetailsform.page.scss'],
})
export class BasicdetailsformPage implements OnInit {
  user_info;
  loader_visibility: boolean = true;

  religion_detail;
  caste_detail;
  subcaste_detail;
  language_detail;
  marital_status_detail;
  manglik_detail;
  blood_group_detail;
  height_detail;

  constructor(
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,
    public router: Router

  ) { }

  ngOnInit() {
    this.user_info = this.user_data.user_info;
    this.religion_detail = this.user_data.religion_detail;
    this.caste_detail = this.user_data.caste_detail;
    this.subcaste_detail = this.user_data.subcaste_detail;
    this.language_detail = this.user_data.language_detail;
    this.marital_status_detail = this.user_data.marital_status_detail;
    this.manglik_detail = this.user_data.manglik_detail;
    this.blood_group_detail = this.user_data.blood_group_detail;
    this.height_detail = this.user_data.height_detail;
    this.loader_visibility=false;
  }

  submit_form(formdata: NgForm) {

    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}submit_basic_form`, formdata.value)
      .subscribe(
        (res: any) => {
          let session_data = [];
          session_data = res;
          this.loader_visibility = false;

            this.user_data.user_info = res;
            this.storage.set('login_details', session_data).then(res => {
              this.router.navigate(['/profile']);
            })
            this.toaster.toaster_show('Details updated successfully.', 'success', 'white');
          
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );


  }

}
