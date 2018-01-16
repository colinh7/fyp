import { User } from './../../providers/auth/auth';
import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';




/**
 * Generated class for the ResetpwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html',
})
export class ResetpwdPage {

  user = {} as User
  disabled: boolean = false;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpwdPage');
  }

  async resetPwd(){
    this.disabled=true;
   // if(this.afAuth.auth.currentUser.emailVerified){
    try{
    const result = await this.afAuth.auth.sendPasswordResetEmail(this.user.email)
    if (result){
      this.navCtrl.setRoot(LoginPage);
      this.disabled = false;
    }
    console.log(result);
    }
    catch (e) {
      console.error(e);
      let alert2 = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: "Please Enter a valid Email Address" ,
        buttons: ['OK']
      });
      
      alert2.present();
      alert2.onDidDismiss(() => {

          this.disabled = false;

      })
      
    }
  //  }
    
  }

}
