import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  loader_visibility: boolean = true;
  about_info;
  constructor(
    public http: HttpClient,
  public url: UrlService,
  public toaster: ToasterService,   

 
  ) { }
  

  ngOnInit() {
    this.get_about_us_info();
  }

  get_about_us_info() {    
    this.http
      .get(`${this.url.serverUrl}get_about_us_info`)
      .subscribe(
        (res) => {
          this.about_info=res['description'];  
          this.loader_visibility = false;
       
        },
        (err) => {
          this.loader_visibility = false;
         this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }
}
