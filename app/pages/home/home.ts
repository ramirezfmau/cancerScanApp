import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { ImagePicker } from 'ionic-native';
import { Cordova } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

  public image: any;
  public risk: number;

  constructor(public navCtrl: NavController, private platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.platform = platform;
     platform.ready().then(() => {
     //   this.permissions = cordova.plugins;
      //  console.log(this.permissions);

     });
  }
/*
  checkPermissionCallback(status):  void {
    if(!status.hasPermission) {
      var errorCallback = function() {
        console.warn('Camera permission is not turned on');
      }

      permissions.requestPermission(
        permissions.CAMERA,
        function(status) {
          if(!status.hasPermission) errorCallback();
        },
        errorCallback);
    }
  }
*/

  /**
   * Returns the current step according to the tag sent in the locals object
   * @returns The current step
   */
  takePicture() : void {
   // permissions.hasPermission(permissions.CAMERA, this.checkPermissionCallback, null);
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
    this.risk = Math.random();
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    window.scrollTo(0, 0);
    setTimeout(function(){
         loader.dismiss();
    }, 1000);

  }

  openModal() : void {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }
}
