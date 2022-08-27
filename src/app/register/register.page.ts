import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url/url.service";
import { ToasterService } from "../service/toaster/toaster.service";
import { UserdataService } from "../service/userdata/userdata.service";
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loader_visibility: boolean = false;
  password: boolean = false;
  created_for_error: boolean = false;
  name_error: boolean = false;
  email_error: boolean = false;
  mobile_error: boolean = false;
  password_error: boolean = false;
  created_for_myself: boolean = false;
  gender_error: boolean = false;
  id_error: boolean = false;
  identity_proof;
  extention;
  identity_proof_name = 'Upload ID Proof';

  constructor(
    private router: Router,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public user_data: UserdataService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,

  ) { }



  ngOnInit(): void {
  }
  check_created_for(evt) {
    evt.target.value == 'myself' ? this.created_for_myself = true : this.created_for_myself = false;
  }

  
  register_user(formdata: NgForm) {
    formdata.value.mobile && (formdata.value.mobile.toString()).length == 10 ? this.mobile_error = false : this.mobile_error = true;
    formdata.value.created_for ? this.created_for_error = false : this.created_for_error = true;
    formdata.value.name ? this.name_error = false : this.name_error = true;
    formdata.value.email ? this.email_error = false : this.email_error = true;
    formdata.value.password ? this.password_error = false : this.password_error = true;
    this.identity_proof ? this.id_error = false : this.id_error = true;
    if (this.created_for_myself)
      formdata.value.gender ? this.gender_error = false : this.gender_error = true;
    if (formdata.value.email && formdata.value.password && formdata.value.mobile && (formdata.value.mobile.toString()).length == 10 && formdata.value.created_for && formdata.value.name && this.identity_proof) {
      if (this.created_for_myself) {
        if (formdata.value.gender) {
        }
        else
          return;
      }
      var f_data = new FormData();
      f_data.append('created_for', formdata.value.created_for);
      f_data.append('name', formdata.value.name);
      f_data.append('email', formdata.value.email);
      f_data.append('mobile', formdata.value.mobile);
      f_data.append('password', formdata.value.password);
      f_data.append('gender', formdata.value.gender);
      f_data.append('identity_proof', this.identity_proof);
      f_data.append('extention', 'jpg');

      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}register_user`, f_data)
        .subscribe(
          (res: any) => {
            this.loader_visibility = false;
            if (res == 0) {
              this.toaster.toaster_show('Eror occured.', 'error', 'white');
            }
            else if (res == 2) {
              this.toaster.toaster_show('This mobile number or email is already registered with us.', 'error', 'white');
            }
            else {
              this.extention = null;
              this.identity_proof_name = 'Upload ID Proof';

              this.toaster.toaster_show('Registeration successfull.', 'success', 'white');
              this.router.navigate(['/login']);

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

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.identity_proof = imageData;
      this.extention = imageData.split(';')[0].split('/')[1];
      this.identity_proof_name = 'Matrimony' + Math.floor(1000 + Math.random() * 9000);

    }, (err) => {
      this.toaster.toaster_show('Error. Please try after some time.', 'error', 'white');
    });
  }


}
