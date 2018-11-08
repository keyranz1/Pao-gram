import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from '../pages/signup/signup';

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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PlacePage,
    AddPlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByQa8WbkzThK8elTt0Z0ngWg0joWIQPy8'
    }),
    AngularFireModule.initializeApp(firebaseConfig.fire, 'pao-gram-1537080620052'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService
  ]
})
export class AppModule {}
