import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../url/url.service";
import { ToasterService } from "../toaster/toaster.service";

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  user_info = [];
  loader_visibility: boolean = true;
  caste_detail;
  subcaste_detail;
  religion_detail;
  language_detail;
  marital_status_detail;
  manglik_detail;
  blood_group_detail;
  height_detail;
  education_category;
  education;
  occupation_category;
  occupation;
  annual_income;

  all_profile_details;

  constructor(
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService
  ) { }


  get_master_data() {
    this.http.get(`${this.url.serverUrl}get_master_data`)
      .subscribe(
        (res) => {
          this.caste_detail = res['caste_detail'];
          this.subcaste_detail = res['subcaste_detail'];
          this.religion_detail = res['religion_detail'];
          this.language_detail = res['language_detail'];
          this.marital_status_detail = res['marital_status_detail'];
          this.manglik_detail = res['manglik_detail'];
          this.blood_group_detail = res['blood_group_detail'];
          this.height_detail = res['height_detail'];
          this.education_category = res['education_category'];
          this.education = res['education'];
          this.occupation_category = res['occupation_category'];
          this.occupation = res['occupation'];
          this.annual_income = res['annual_income'];
          
        },
        (err) => {
          // this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          return err;

        }
      );

  }



}
