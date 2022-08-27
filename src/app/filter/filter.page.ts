import { Component, OnInit } from '@angular/core';
import { UserdataService } from "../service/userdata/userdata.service";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  caste_detail;
  type = 'caste';
  religion_detail;
  gender;
  marital_status_detail;
  manglik_detail;
  height_detail;
  education;
  occupation;
  annual_income;
  loader_visibility: boolean = true;
  state;
  city;
  city_updated;
  user_id;

  f_diet;
  f_city;
  f_income;
  f_manglik;
  f_age = { 'lower': 25, 'upper': 35 };
  f_height;
  f_occupation;
  f_caste;
  f_education;
  state_id = '34';
  // location_on() {
  //   this.location1 = true
  // }
  constructor(
    public user_data: UserdataService,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public router: Router

  ) { }

  ngOnInit() {
    this.caste_detail = this.user_data.caste_detail;
    this.religion_detail = this.user_data.religion_detail;
    this.manglik_detail = this.user_data.manglik_detail;
    this.height_detail = this.user_data.height_detail;
    this.education = this.user_data.education;
    this.occupation = this.user_data.occupation;
    this.annual_income = this.user_data.annual_income;
    this.gender = this.user_data.user_info['gender'];
    this.user_id = this.user_data.user_info['id'];
  }

  change_view(view) {
    this.type = view;
  }

  set_value(view, event) {
    switch (view) {
      case 'caste': {
        this.f_caste = event.target.value;
        break;
      }
      case 'education': {
        this.f_education = event.target.value;
        break;
      }
      case 'occupation': {
        this.f_occupation = event.target.value;
        break;
      }
      case 'diet': {
        this.f_diet = event.target.value;
        break;
      }
      case 'city': {
        this.f_city = event.target.value;
        break;
      }
      case 'income': {
        this.f_income = event.target.value;
        break;
      }
      case 'manglik': {
        this.f_manglik = event.target.value;
        break;
      }
      case 'age': {
        this.f_age = event.target.value;
        break;
      }
      case 'height': {
        this.f_height = event.target.value;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }


  submit_details(formdata: NgForm) {
    var f_data = new FormData();
    f_data.append('caste_id', this.f_caste);
    f_data.append('education_id', this.f_education);
    f_data.append('occupation_id', this.f_occupation);
    f_data.append('diet', this.f_diet);
    f_data.append('city_id', this.f_city);
    f_data.append('annual_income', this.f_income);
    f_data.append('manglik', this.f_manglik);
    f_data.append('min_height', "4'2'' (127 cm)");
    f_data.append('max_height', this.f_height);
    f_data.append('min_age', this.f_age['lower'].toString());
    f_data.append('max_age', this.f_age['upper'].toString());
    f_data.append('gender', this.gender);
    f_data.append('user_id', this.user_id);
    f_data.append('offset', '0');
    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}filter_search_result`, f_data)
      .subscribe(
        (res: any) => {
          this.loader_visibility = false;


          let navExtra: NavigationExtras = {
            state: {
              data: res,
            },
          };


          this.router.navigate(['filtersearchresult'], navExtra);
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );

    //this.router.navigate(['/searchresult']);
  }

  ionViewWillEnter() {
    this.loader_visibility = true;

    this.http
      .get(`${this.url.serverUrl}get_state`)
      .subscribe(
        (res: any) => {
          this.state = res['state'];
          this.city = res['city'];
          this.city_updated = res['city'];
          this.get_city_of_state(this.state_id);
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  get_city_of_state(state_id) {
    this.http
      .get(`${this.url.serverUrl}get_filter_city?state_id=${state_id}`)
      .subscribe(
        (res: any) => {
          this.city_updated = res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }


  filter_city(ev) {
    this.loader_visibility = true;
    let filter_id = ev.target.value;
    this.get_city_of_state(filter_id);
    this.state_id = filter_id;
  }


}
