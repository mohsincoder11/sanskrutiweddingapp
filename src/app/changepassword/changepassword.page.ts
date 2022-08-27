import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  loader_visibility: boolean = false;
  password_errors: boolean = false;

  constructor(
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,

  ) { }

  ngOnInit() {
  }

  update_password(formdata: NgForm) {
    if (formdata.value.pass1 && formdata.value.pass1 == formdata.value.pass2) {
      this.password_errors = false;
      this.loader_visibility = true;
      const formData: FormData = new FormData();
      formData.append('id',this.user_data.user_info['id'])
      formData.append('password',formdata.value.pass1)
     
      this.http
        .post(`${this.url.serverUrl}update_user_password`, formData)
        .subscribe(
          (res: any) => {
            this.toaster.toaster_show('Password update successfully.', 'success', 'white');
            formdata.resetForm();
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          }
        );
    }
    else{
            this.password_errors = true;
    }
  }
}
