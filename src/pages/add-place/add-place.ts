import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
// import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import {ToastController, normalizeURL} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {ImageUploaderProvider} from "../../providers/image-uploader/image-uploader";
import { ImagePicker } from '@ionic-native/image-picker';

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


  constructor(public geoLoc: Geolocation,public imagePicker: ImagePicker ,public firebaseService: ImageUploaderProvider, public toastCtrl: ToastController, private modalCtrl: ModalController, private camera:Camera, public db: AngularFireDatabase, public storage: AngularFireStorage) {
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
    this.post.push({'imgSrc': this.imageUrl});
    console.log('posts : ', this.post);


    this.uploadImageToFirebase(this.imageUrl);


  }

  uploadImageToFirebase(image){
    image = normalizeURL(image);

    //uploads img to firebase storage



    this.firebaseService.uploadImage(image)
      .then(photoURL => {
        let toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
      })
  }

  choosePic(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
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
  onLocate() {
    this.geoLoc.getCurrentPosition()
      .then(
        location => {
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
          console.log(location);
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
  }

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
