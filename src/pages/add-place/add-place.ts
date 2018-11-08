import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
//import { NativeGeocoder } from '@ionic-native/native-geocoder';
//import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 30.514669,
    lng:  -90.468229
  }
  locationIsSet = false;

  imageUrl = '';
  post: any;


  constructor(private modalCtrl: ModalController, private camera:Camera, public db: AngularFireDatabase, public storage: AngularFireStorage) {
    this.post = this.db.list('/post');
    this.post.push({'title': 'a sample another post'});
    // this.post.push({'imgSrc': this.imageUrl})
    // console.log('posts : ', this.post);
  }


  onSubmit(form: NgForm){
    console.log(form.value);
    console.log(this.location);
    const ref = this.storage.ref('post');
    // ref.put()
    this.post.push({'imgSrc': this.imageUrl})
    console.log('posts : ', this.post);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;

        }
        // let options: NativeGeocoderOptions = {
        //   useLocale: true,
        //   maxResults: 5
        // };
        //
        // this.natGeoCode.reverseGeocode(Number("location.lat"),Number("location.lng"), options)
        //   .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
        //   .catch((error: any) => console.log(error));
      }
    );
  }
  // onLocate() {
  //   this.Geolocation.getCurrentPosition()
  //     .then(
  //       location => {
  //         this.location.lat = location.coords.latitude;
  //         this.location.lng = location.coords.longitude;
  //         this.locationIsSet = true;
  //       }
  //     )
  //     .catch(
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  onTakingPicture(){
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      // destinationType: this.camera.DestinationType.FILE_URI,
      // mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then( imageData => {
      console.log("Image : "+ this.imageUrl);
      let base64Img =  imageData;
      this.imageUrl = base64Img;
      console.log(this.imageUrl);
      // alert("image : "+this.imageUrl);
    }).catch( err => {
      console.log(err);
    });
  }
}
