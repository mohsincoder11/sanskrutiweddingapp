import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { RegisterPageRoutingModule } from '../register/register-routing.module';

@Component({
  selector: 'app-careerandeducationform',
  templateUrl: './careerandeducationform.page.html',
  styleUrls: ['./careerandeducationform.page.scss'],
})
export class CareerandeducationformPage implements OnInit {
  user_info;
  education;
  education_category;
  loader_visibility: boolean = true;
  occupation;
  occupation_category;
  annual_income;
  education_updated;
  occupation_updated;

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
    this.education = this.user_data.education;
    this.education_updated = this.user_data.education;
    this.education_category = this.user_data.education_category;
    this.occupation = this.user_data.occupation;
    this.occupation_updated = this.user_data.occupation;
    this.occupation_category = this.user_data.occupation_category;
    this.annual_income = this.user_data.annual_income;
    this.loader_visibility = false;
    console.log(this.user_info);
  }

  filter_education(ev) {
    let filter_id = ev.target.value;
    this.education_updated = this.education.filter(function (e) {
      return e.education_category_id == filter_id;
    });
  }

  filter_occupation(ev) {
    let filter_id = ev.target.value;
    this.occupation_updated = this.occupation.filter(function (e) {
      return e.occupation_category_id == filter_id;
    });
  }

  submit_form(formdata: NgForm) {  

    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}submit_careerandeducation_form`, formdata.value)
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
