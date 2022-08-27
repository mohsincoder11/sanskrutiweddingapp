import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { Storage } from '@ionic/storage';
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lifestyleform',
  templateUrl: './lifestyleform.page.html',
  styleUrls: ['./lifestyleform.page.scss'],
})
export class LifestyleformPage implements OnInit {
  user_info;
  loader_visibility: boolean = true;
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
    this.loader_visibility = false;


  }

  submit_form(formdata: NgForm) {
    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}submit_lifestyle_form`, formdata.value)
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
