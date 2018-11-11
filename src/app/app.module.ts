import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from '../pages/signup/signup';
import { MyprofilePage} from "../pages/myprofile/myprofile";

import { Geolocation } from '@ionic-native/geolocation';
import {AddPlacePage} from "../pages/add-place/add-place";
import {PlacePage} from "../pages/place/place";
import {SetLocationPage} from "../pages/set-location/set-location";
import {AgmCoreModule} from "@agm/core";
import { Camera } from '@ionic-native/camera';

import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { firebaseConfig } from "../config";
import { NgxErrorsModule } from "@ultimate/ngxerrors";

import { AuthService} from "../services/auth.service";
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { ImageUploaderProvider } from '../providers/image-uploader/image-uploader';
import { ImagePicker } from '@ionic-native/image-picker';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PlacePage,
    AddPlacePage,
    MyprofilePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPew8azgknFxwg-z-rbvw6i7DgXODeHis'
    }),
    AngularFireModule.initializeApp(firebaseConfig.fire, 'pao-gram-1537080620052'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxErrorsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage,
    LoginPage,
    MyprofilePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    ImageUploaderProvider,
    HttpClient,
    ImagePicker,
    Geolocation
  ]
})
export class AppModule {}
