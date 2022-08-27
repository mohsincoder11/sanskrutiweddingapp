import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mobile;
  loader_visibility: boolean = false;
  mobile_email: boolean = false;
  password: boolean = false;
  constructor(
    private router: Router,
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private _location: Location,
    private platform: Platform,

 
  ) { }

  ngOnInit() {
  }

  check_maxlength(evt) {
    let mobile = evt.target.value;
    $("#mobile").val(mobile.substring(0, 10));
    $("#email").val('');
    this.mobile_email = false;
  }

  check_email(evt) {
    $("#mobile").val('');
    this.mobile_email = false;
  }

  log_in(formdata: NgForm) {
   formdata.value.email ? this.mobile_email = false : this.mobile_email = true;
    formdata.value.password ? this.password = false : this.password = true;
    if (formdata.value.email && formdata.value.password) {
      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}user_login`,formdata.value)
        .subscribe(
          (res: any) => {            
            let session_data = [];
            session_data = res;
            this.loader_visibility = false;
            if (res == 0) {
              this.toaster.toaster_show('Login failed! Invalid credentials.', 'error', 'white');
            }
            else {
              this.user_data.user_info=res;
              this.storage.set('login_details', session_data).then(res => {
                this.router.navigate(['/dashboard']);
              })
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

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/login')) {
        navigator['app'].exitApp();
      } else {
        this._location.back();
      }
    });


    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });
    
  }
  
}
