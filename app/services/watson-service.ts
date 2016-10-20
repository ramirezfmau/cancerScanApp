import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Platform} from 'ionic-angular';
import { Transfer } from 'ionic-native';


@Injectable()
export class WatsonService {

  constructor(
    private http: Http, private platform: Platform) {
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
        var response = JSON.parse(data.response);
        alert(response.custom_classes);
        resolve(response[18]);
      });
    });
  }
}
