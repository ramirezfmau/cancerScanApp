import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

declare var cordova;
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  public image: any;

  constructor(public navCtrl: NavController ) {
  }

  takePicture() : void {
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
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };


    Camera.getPicture(options).then((imageURI) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      /* if (imageURI.substring(0,21)=="content://com.android") {
          var photo_split = imageURI.split("%3A");
          imageURI = "content://media/external/images/media/" + photo_split[1];
          alert("2");
          this.image = imageURI;
        }*/

      cordova.window.resolveLocalFileSystemURI(imageURI, (fileEntry) => {

        this.image = fileEntry.nativeURL;
        alert();
       });
      //alert(this.image);
    }, (err) => {

     // Handle error
    });
  }

}
