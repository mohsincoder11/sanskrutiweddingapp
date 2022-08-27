import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  mobile;
  fill_all;
  password_errors;
  loader_visibility;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public  toaster:ToasterService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.mobile = this.route.snapshot.paramMap.get('number');
  }

  update_password(formdata: NgForm) {
    formdata.value.pass1 && formdata.value.pass2 ? this.fill_all = false : this.fill_all = true;
    formdata.value.pass1 == formdata.value.pass2 ? this.password_errors = false : this.password_errors = true;
    if (formdata.value.pass1 && formdata.value.pass2 && formdata.value.pass1 == formdata.value.pass2) {
      this.loader_visibility=true;
      formdata.value.mobile = this.mobile;
     
      this.http
        .post(`${this.url.serverUrl}reset_user_password`, formdata.value)
        .subscribe(
          (res) => {          
              this.toaster.toaster_show('Password updated successfully.', 'success', 'white');
            this.loader_visibility=false;
            formdata.resetForm();
            this.router.navigate(['/login']);

          },
          (err) =>{
            this.loader_visibility = false;

            this.toaster.toaster_show('Server error.', 'error', 'white');
        } 
        );
    }

  }
}
