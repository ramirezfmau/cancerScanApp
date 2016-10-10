import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Platform} from 'ionic-angular';
import { Transfer } from 'ionic-native';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WatsonService {

  constructor(
    private http: Http, private platform: Platform) {
  }
  private apiUrl = 'https://kg-watson.herokuapp.com/api/custom_classify/kevoclasificador_881695007';

  postPicture(img): any {/*
    let ft = new Transfer();
    let filename = 'file.png';

    let options = {
      fileKey: "images_file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg"
    };

    return ft.upload(img, this.apiUrl, options, false);*/
    let formData = new FormData();
    formData.append("images_file", img);

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });

    return this.http
    .post(this.apiUrl, formData, options)
    .toPromise();
  }
}
