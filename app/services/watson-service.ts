import { Injectable }     from '@angular/core';
import { Platform} from 'ionic-angular';
import { Transfer } from 'ionic-native';


@Injectable()
export class WatsonService {

  constructor(
    private platform: Platform) {
  }
  private apiUrl = 'https://kg-watson.herokuapp.com/api/custom_classify/kevoclasificador_881695007';

  postPicture(img) : any {
    let ft = new Transfer();
    let filename = 'file.png';
    let options = {
      fileKey: "images_file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg"
    };

    return new Promise((resolve, reject) => {
      ft.upload(img, this.apiUrl, options, false).then((data: any) => {
        let response = JSON.parse(data.response);
        let result=0;
        if(response.images[0].classifiers.length > 0) {
          result = response.images[0].classifiers[0].classes[0].score;
        }
        resolve(result);
      });
    });
  }
}
