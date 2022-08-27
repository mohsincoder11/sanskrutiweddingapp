import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { Storage } from '@ionic/storage';
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-communicationform',
  templateUrl: './communicationform.page.html',
  styleUrls: ['./communicationform.page.scss'],
})
export class CommunicationformPage implements OnInit {
  user_info;
  loader_visibility: boolean = true;
  state;
  city;
  city_updated;

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
   }

   ionViewWillEnter() {
    this.http
    .get(`${this.url.serverUrl}get_state`)
    .subscribe(
      (res: any) => {
        this.state=res['state'];        
        this.city=res['city'];        
        this.city_updated=res['city'];   
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
    this.http
    .get(`${this.url.serverUrl}get_filter_city?state_id=${filter_id}`)
    .subscribe(
      (res: any) => {
        this.city_updated=res;              
         this.loader_visibility = false;        
      },
      (err) => {
        this.loader_visibility = false;
        this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
      }
    );
  }


  submit_form(formdata: NgForm) { 
    
    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}submit_communication_form`, formdata.value)
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
