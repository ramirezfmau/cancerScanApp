import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	public image: any;
  constructor(public navCtrl: NavController) {
  }
}
