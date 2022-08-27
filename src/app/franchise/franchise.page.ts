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
  selector: 'app-franchise',
  templateUrl: './franchise.page.html',
  styleUrls: ['./franchise.page.scss'],
})
export class FranchisePage implements OnInit {
  loader_visibility: boolean = false;
  name_error: boolean = false;
  email_error: boolean = false;
  mobile_error: boolean = false;
  id_error: boolean = false;
  document_proof;
  extention;
  document_name = 'Upload Document Proof';

  city_error: boolean = false;
  address_error: boolean = false;
  exact_location_error: boolean = false;
  message_error: boolean = false;
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

  ngOnInit() {
  }

  submit_details(formdata: NgForm) {
    formdata.value.mobile && (formdata.value.mobile.toString()).length == 10 ? this.mobile_error = false : this.mobile_error = true;
    formdata.value.user_name ? this.name_error = false : this.name_error = true;
    formdata.value.email ? this.email_error = false : this.email_error = true;

    formdata.value.city ? this.city_error = false : this.city_error = true;
    formdata.value.address ? this.address_error = false : this.address_error = true;
    formdata.value.exact_location ? this.exact_location_error = false : this.exact_location_error = true;
    formdata.value.message ? this.message_error = false : this.message_error = true;
    this.document_proof ? this.id_error = false : this.id_error = true;
   
    if (formdata.value.city && formdata.value.address && formdata.value.email && formdata.value.exact_location && formdata.value.message  && formdata.value.mobile && (formdata.value.mobile.toString()).length == 10 && formdata.value.user_name && this.document_proof) {    

      var f_data = new FormData();      
      f_data.append('user_name', formdata.value.user_name);
      f_data.append('email', formdata.value.email);
      f_data.append('mobile', formdata.value.mobile);
      f_data.append('document_proof', this.document_proof);
      f_data.append('extention', 'jpg');
      f_data.append('city', formdata.value.city);
      f_data.append('address', formdata.value.address);
      f_data.append('exact_location', formdata.value.exact_location);
      f_data.append('message', formdata.value.message);

      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}insert_franchise_form`, f_data)
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
              this.document_name = 'Upload Document Proof';
              this.toaster.toaster_show('Form submited successfully.', 'success', 'white');

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
      this.document_proof = imageData;
      this.extention = imageData.split(';')[0].split('/')[1];
      this.document_name = 'ID' + Math.floor(1000 + Math.random() * 9000);

    }, (err) => {
      this.toaster.toaster_show('Error. Please try after some time.', 'error', 'white');
    });
  }


}

