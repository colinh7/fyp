import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';




/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor( private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
  }

}
