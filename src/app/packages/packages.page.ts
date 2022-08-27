
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { IonSlides } from '@ionic/angular';
import { UserdataService } from "../service/userdata/userdata.service";
import { Router } from '@angular/router';
declare var RazorpayCheckout: any;
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {
  slideOptions = {
    initialSlide: 1,
    slidesPerView: 1.5,
    speed: 500,
  };
  user_info;
  order;

  @ViewChild('slider', {static: true}) slider: IonSlides;
  
  switchTab = 'available';
  loader_visibility: boolean = true;
  package_info;
  constructor(
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,
    public router:Router,
    public modalCtrl: ModalController,
  ) { }
  ionViewWillEnter() {
    this.user_info = this.user_data.user_info;

  }
  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
  }

  slidesDidLoad2(slides: IonSlides): void {
   slides.startAutoplay();
  }


  ngOnInit() {
    this.get_package_info();
  }

  gotoSlide(index) {
    this.slider.slideTo(index, 500);
  }

  get_package_info() {
    this.http
      .get(`${this.url.serverUrl}get_package_info`)
      .subscribe(
        (res) => {
          this.package_info = res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  purchase_subscription(id) {
    this.checkout(id);   
  }

  async checkout(id) {
    const razorPayOptions = {
      key: "rzp_live_y3TX0iKm0TWhEm",
      amount: "",
      currency: "INR",
      name: "Sanskriti Weddings",
      description: "",
      image: "https://sanskritiweddings.com/images/logo1.png",
      payment_capture: "1",
      order_ID: "",
      prefill: {
        email: `${this.user_info.email}`,
        contact: `${this.user_info.mobile}`,
        name: "Sanskriti Weddings",
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: function () {
       //   alert("dismissed");
        },
      },
    };

    //  on successful payment capture
    const successCallback = (paymentId) => {
      // Do what you want to do after payment is done
     // this.startLoading();
     let payment_id=paymentId.razorpay_payment_id;
     this.loader_visibility = true;
    this.http
      .get(`${this.url.serverUrl}purchase_subscription?user_id=${this.user_info.id}&package_id=${id}&payment_id=${payment_id}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Subscribe to package successfully.', 'success', 'white');
            this.router.navigate([`success`]);
  },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );

   
     };

    const cancelCallback = function (error) {
   //  alert(JSON.stringify(error));
     // alert("Payment canceled");
    };

   // creating order id
    this.http
      .get(`${this.url.serverUrl}create_order_api?package_id=${id}`)

      .subscribe(async (res) => {
       // this.stopLoading();
        this.order = await res;
        razorPayOptions.order_ID = await this.order;
        RazorpayCheckout.on('payment.success', successCallback);
        RazorpayCheckout.on('payment.cancel', cancelCallback);
        RazorpayCheckout.open(razorPayOptions);
      });
  }



}

