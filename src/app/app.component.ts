import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { UserdataService } from "./service/userdata/userdata.service";
import { UrlService } from "./service/url/url.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user_info;
  constructor(
    public storage: Storage,
    public router: Router,
    private socialSharing: SocialSharing,
    private user_data: UserdataService,
    public url: UrlService

  ) {
    this.initializeApp();

  }

  ngOnInit() {   
    this.user_data.get_master_data();
  }

  get_session_data() {
  this.user_info = this.user_data.user_info;
  }

  initializeApp() {
    this.storage.create();

    this.storage.get('login_details').then(res => {
      if (res) {
        this.user_data.user_info = res;
        this.user_info = res;
        this.router.navigateByUrl('/dashboard');
      }
      else
        this.router.navigateByUrl('/login');
    })
  }

  socialshare() {
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      url: 'https://play.google.com/store/apps/details?id=io.ionic.weddings',
    };
    this.socialSharing.shareWithOptions(options);
  }

  open_playstore() {
    window.open("https://play.google.com/store/apps/details?id=io.ionic.weddings", "_system");
  }

  log_out() {
    this.user_data.user_info = null;
    this.storage.remove('login_details').then(re => {
      this.router.navigateByUrl('/login');
    })
  }



}
