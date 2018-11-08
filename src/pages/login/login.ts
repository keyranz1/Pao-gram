import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService} from "../../services/auth.service";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm : FormGroup;
  loginError: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBd: FormBuilder, private auth: AuthService) {

      this.loginForm = formBd.group({
          email: ['kiran@gmail.com',Validators.compose([Validators.required, Validators.email])],
          password: ['Loveuu123',Validators.compose([Validators.required, Validators.minLength(6)])]
      });

  }

  login(){
      let data = this.loginForm.value;

      if(!data.email){
        return;
      }

      let credentials = {
          email: data.email,
          password: data.password
      };
      console.log(data);
      this.auth.signInWithEmail(credentials)
        .then(
          () => this.navCtrl.setRoot(HomePage),
          error => this.loginError = error.message
        );

  }

}
