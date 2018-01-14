import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { User } from '../../models/user';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 user = {} as User;
 
  constructor(private afAuth:AngularFireAuth, private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
 login(){
try{
const result = this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
if (result){
  this.nav.setRoot("TabsPage");
}
console.log(result);
}
catch (e) {
  console.error(e);
}
}


register(){
  this.nav.push("RegisterPage");
}
}













