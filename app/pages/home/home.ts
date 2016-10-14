import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { ImagePicker } from 'ionic-native';
import { Cordova } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {WatsonService} from '../../services/watson-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [WatsonService]
})

export class HomePage {

  public image: any;
  public risk: number;

  constructor(private navCtrl: NavController, private platform: Platform, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private watsonService: WatsonService) {

    this.platform = platform;
     let formData = new FormData();
    formData.append("images_file", "asd");
    console.log(formData);
  }

  /**
   *
   * @returns
   */
  takePicture() : void {
    this.risk = -1;
    let options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG
     };

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;

    }, (err) => {
    // Handle error
    });
  }

  selectPicture() : void {
    this.risk = -1;
    let options = {
      quality: 100,
      maximumImagesCount: 1
    };

    ImagePicker.getPictures(options).then((results) => {
      this.image = results[0];
    }, (err) => { });
  }

  analyze() : void {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.watsonService.postPicture(this.image).then((res: any) => {
   //   alert(res);
      this.risk = 0.5;
      loader.dismiss();
    }).catch((error) => {alert(error[0]);});
  }

  openModal() : void {
    let alert = this.alertCtrl.create({
      title: 'Test',
      subTitle: 'Test..!',
      buttons: ['OK']
    });
    alert.present();
  }
}
