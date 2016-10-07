import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/find-doctor/find-doctor.html'
})
export class FindDoctor {

  public items: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
     this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'Dr. Allison Cameron',
      'Dr. Robert Chase',
      'Dr. Lisa Cuddy',
      'Dr. Eric Foreman',
      'Dr. Gregory House',
      'Dr. Lawrence Kutner',
      'Dr. Brock Sterling',
      'Dr. Chris Taub',
      'Dr. Remy Hadley',
      'Dr. James Wilson',
      'Dr. Amber Volakis',
      'Dr. Martha M. Masters',
      'Dr. Jessica Adams',
      'Dr. Chi Park',
      'Dr. Miranda Bailey',
      'Dr. Preston Burke',
      'Dr. Ellis Grey',
      'Dr. Lexie Grey',
      'Dr. Meredith Grey',
      'Dr. Alex Karev',
      'Dr. Oliver Lebackes',
      'Dr. Addison Montgomery',
      'Dr. George OMalley',
      'Dr. Parker',
      'Dr. Derek Shepherd',
      'Dr. Mark Sloan',
      'Dr. Isobel "Izzie" Stevens',
      'Dr. Callie Torres',
      'Dr. Richard Webber',
      'Dr. Wyatt',
      'Dr. Cristina Yang',
      'Dr. Arizona Robbins',
      'Dr. Erica Hahn',
      'Dr. Swender',
      'Dr. Virginia Dixon',
      'Dr. Owen Hunt',
      'Dr. April Kepner',
      'Dr. Jackson Avery'
    ];
  }

  getItems(ev): void {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  showPrompt(): void {
    let prompt = this.alertCtrl.create({
      title: 'Email your doctor',
      message: "Enter your mail",
      inputs: [
        {
          name: 'message',
          placeholder: 'Message'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
