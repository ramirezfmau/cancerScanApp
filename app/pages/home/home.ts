import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  public image: any;
  constructor(public navCtrl: NavController) {
  }
  openCam(){

  	Camera.getPicture((imageUri) => {

        // Do something

    }).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64:
	 let base64Image = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {
	 // Handle error
	});

  }

}
