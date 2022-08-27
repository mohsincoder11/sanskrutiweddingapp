import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { Storage } from '@ionic/storage';
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user_info;
  loader_visibility: boolean = true;
  bride_list;
  groom_list;
  slider_detail;

  slideOptions = {
    initialSlide: 1,
    loop: true,
    slidesPerView: 2.8,
    centeredSlides: false,
    speed: 1500,
  };


  slideOptions2 = {
    initialSlide: 1,
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 1500,
  };
  slideOptions3 = {
    initialSlide: 1,
    loop: true,
    slidesPerView: 1.5,
    centeredSlides: true,
    speed: 1500,
  };

  slideOptions11 = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 500,
    resistanceRatio: 0,
    spaceBetween: 1,
  };

  constructor(
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,   
    public user_data: UserdataService,
    public alertController: AlertController,
    private _location: Location,
    private platform: Platform,
    public menuCtrl: MenuController,

  ) { }


  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }

  slidesDidLoad1(slides: IonSlides): void {
    slides.startAutoplay();
  }

  slidesDidLoad2(slides: IonSlides): void {
    slides.startAutoplay();
  }

  slidesDidLoad3(slides: IonSlides): void {
    slides.startAutoplay();
  }
  slidesDidLoadn({ slides }: { slides: IonSlides }): void {
    slides.startAutoplay();
  }
  ngOnInit(): void {
    this.get_user_dashboard_data();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/dashboard')) {
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
  doRefresh(ev) {
    setTimeout(() => {
      this.get_user_dashboard_data();
      ev.target.complete();

    },2500);
  }


  get_user_dashboard_data() {
    this.user_info=this.user_data.user_info;
    this.http
      .get(`${this.url.serverUrl}get_user_dashboard_data?id=${this.user_info['id']}&gender=${this.user_info['gender']}`)
      .subscribe(
        (res) => {
          this.bride_list=res['bride'];
          console.log(this.bride_list);
          this.groom_list=res['groom'];
          this.slider_detail=res['slider_detail'];          
          this.user_data.user_info=res['user_detail'];
          this.storage.set('login_details', res['user_detail']);
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
         this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  
  open_ads(url) {
    window.open(url, "_system");
  }
}
