
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router,NavigationExtras } from '@angular/router';
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
  selector: 'app-moblogin',
  templateUrl: './moblogin.page.html',
  styleUrls: ['./moblogin.page.scss'],
})
export class MobloginPage implements OnInit {

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

  // check_maxlength(evt) {
  //   let mobile = evt.target.value;
  //   $("#mobile").val((mobile.trim()).substring(0,10));
  //   this.mobile_email = false;
  // }

 

  sent_otp(formdata: NgForm) {
   formdata.value.mobile ? this.mobile_email = false : this.mobile_email = true;
    if (formdata.value.mobile && (formdata.value.mobile.toString()).length==10 ) {
      this.loader_visibility = true;
      this.mobile_email=false;
      this.http
        .post(`${this.url.serverUrl}send_otp`,formdata.value)
        .subscribe(
          (res: any) => {            
             this.loader_visibility = false;
            if (res == 0)
              this.toaster.toaster_show('This mobile number is not registered with us.', 'error', 'white');
            else {
              this.toaster.toaster_show('OTP sent on your given mobile number.', 'success', 'white');
              let navExtra: NavigationExtras = {
                state: {
                  response: res,
                },
              };
              this.router.navigate(['verifymobilelogin'], navExtra);
              formdata.resetForm();
            }
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          }
        );
    }
    else
    this.mobile_email=true;
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
