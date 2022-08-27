import { Component, OnInit,ViewChild } from '@angular/core';
import { UserdataService } from "../service/userdata/userdata.service";
import { UrlService } from "../service/url/url.service";
import { IonContent } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ToasterService } from "../service/toaster/toaster.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  switchTab = 'basic';
  user_info;
  @ViewChild(IonContent) content: IonContent;
  image = null;
  image_preview='a';
  loader_visibility:boolean=true;


  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    public user_data: UserdataService,
    public url: UrlService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    public toaster:ToasterService,
    public http: HttpClient,

  ) { }

  ngOnInit() {   
    this.user_info=this.user_data.user_info;
    this.loader_visibility=false;

  }

  ionViewWillEnter() {
     this.user_info=this.user_data.user_info;
    this.loader_visibility=false;
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
      this.image = imageData;
      var f_data = new FormData();
      f_data.append('image',this.image);
      f_data.append('user_id',this.user_info['id']);
      this.loader_visibility = true;
      this.http
      .post(`${this.url.serverUrl}upload_user_photo`, f_data)
      .subscribe(
        (res) => {
          this.user_info.userphoto=res;
          this.loader_visibility = false;
          this.toaster.toaster_show('Photo uploaded successfully.', 'success', 'white');

        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        });


    }, (err) => {
      this.toaster.toaster_show('Error. Please try after some time.', 'error', 'white');
    });
  }

  delete_image(id){
    this.loader_visibility = true;
    this.http
    .get(`${this.url.serverUrl}delete_user_image?id=${id}`)
    .subscribe(
      (res) => {
        this.user_info.userphoto=res;
        this.loader_visibility = false;
       this.toaster.toaster_show('Image deleted successfully.', 'success', 'white');
      },
      (err) => {
        this.loader_visibility = false;
       this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
      }
    );
  }

  scrollToBottom(){
    console.log('scrolll');
    this.content.scrollToBottom(600);
  }

}
