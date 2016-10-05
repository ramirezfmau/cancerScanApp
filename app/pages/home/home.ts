import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { ImagePicker } from 'ionic-native';
import { Cordova } from 'ionic-native';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  public image: any;
  public permissions: any;

  constructor(public navCtrl: NavController, private platform: Platform) {

    this.platform = platform;
     platform.ready().then(() => {
        this.permissions = cordova.plugins;
        console.log(this.permissions);

     });
  }

  checkPermissionCallback(status):  void {
    if(!status.hasPermission) {
      var errorCallback = function() {
        console.warn('Camera permission is not turned on');
      }

      this.permissions.requestPermission(
        this.permissions.CAMERA,
        function(status) {
          if(!status.hasPermission) errorCallback();
        },
        errorCallback);
    }
  }


  takePicture() : void {
    this.permissions.hasPermission(this.permissions.CAMERA, this.checkPermissionCallback, null);
    var options = {
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
    var options = {
      quality: 100,
      maximumImagesCount: 1
    };
    ImagePicker.getPictures(options).then((results) => {
      this.image = results[0];
    }, (err) => { });
/*
    Camera.getPicture(options).then((imageURI) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      /* if (imageURI.substring(0,21)=="content://com.android") {
          var photo_split = imageURI.split("%3A");
          imageURI = "content://media/external/images/media/" + photo_split[1];
          alert("2");
          this.image = imageURI;
        }*/


         /* window.resolveLocalFileSystemURI(imageURI, (fileEntry) => {
             alert();
            this.image = fileEntry.nativeURL;

          });*/

      //alert(this.image);
   /* }, (err) => {

     // Handle error
    });*/
  }

}
