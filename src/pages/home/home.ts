import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {MyprofilePage} from "../myprofile/myprofile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  myProfilePage = MyprofilePage;

  constructor(public navCtrl: NavController) {

  }

}
