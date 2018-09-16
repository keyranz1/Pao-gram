import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
//import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

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
  constructor(private modalCtrl: ModalController) {}


  onSubmit(form: NgForm){
    console.log(form.value);
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
  //   this.geolocation.getCurrentPosition()
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
}
