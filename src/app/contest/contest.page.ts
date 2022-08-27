import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";

@Component({
  selector: 'app-contest',
  templateUrl: './contest.page.html',
  styleUrls: ['./contest.page.scss'],
})
export class ContestPage implements OnInit {
  loader_visibility: boolean = true;
  contest_info;
  constructor(
    public http: HttpClient,
  public url: UrlService,
  public toaster: ToasterService,   

 
  ) { }
  

  ngOnInit() {
    this.get_contest_info();
  }

  get_contest_info() {    
    this.http
      .get(`${this.url.serverUrl}get_contest_info`)
      .subscribe(
        (res) => {
          this.contest_info=res['description'];  
          this.loader_visibility = false;
       
        },
        (err) => {
          this.loader_visibility = false;
         this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }
}
