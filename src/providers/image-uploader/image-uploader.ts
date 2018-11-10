import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
/*
  Generated class for the ImageUploaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageUploaderProvider {

  constructor(public http: HttpClient, public firebaseStorage: AngularFireStorage) {
    console.log('Hello ImageUploaderProvider Provider');
  }

  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = this.firebaseStorage.storage.ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.getDownloadURL()
          .then(snapshot => {
            resolve(snapshot);
          }, err => {
            reject(err);
          });
      })
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

}
