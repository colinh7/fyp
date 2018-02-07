import { User } from './../../models/user';
import { Http } from '@angular/http';
import { LoginPage } from './../login/login';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth"
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import firebase from 'firebase';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

authState: any = null;

  ionViewDidLoad() {

  }

  user = {} as User;


  constructor(private afAuth: AngularFireAuth, public http: Http,
    public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {

      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth
      });

  }




  async register(user: User) {

    var result2;

    this.user.displayName = this.user.firstName + "" + this.user.lastName;

    if (this.user.email && this.user.firstName && this.user.lastName && this.user.phoneNumber && this.user.password != null) {
      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
        console.log(result);
        if (result) {

          result2 = this.afAuth.auth.currentUser.sendEmailVerification();
          this.afAuth.auth.currentUser.updateProfile({ displayName: this.user.displayName, photoURL: "" })
          this.user.uuid = this.afAuth.auth.currentUser.uid;
        
          if (result2) {
            let alert = this.alert.create({
              title: 'Verification Email Sent',
              subTitle: 'A verification email has been sent to your email address. You must verify your email and phone number in order to continue.',
              buttons: ['OK']
            });

            this.createEntry();

            alert.present();
            alert.onDidDismiss(() => {

              this.navCtrl.setRoot(LoginPage);
              
              console.log(this.afAuth.auth.currentUser.email)


            })

          }





        }

      }
      catch (e) {
        console.error(e);

        let alert = this.alert.create({
          title: 'Error',
          subTitle: e,
          buttons: ['OK']
        });

        alert.present();
      }

    }

    else {

      let alert = this.alert.create({
        title: 'Oops!',
        subTitle: 'Please ensure all fields are filled out correctly.',
        buttons: ['OK']
      });

      alert.present();
    
    }
  }

  async verifyEmail() {
    try {
      const result2 = await this.afAuth.auth.currentUser.sendEmailVerification();
      console.log(result2);
      if (result2) {

        let alert = this.alert.create({
          title: 'Verification Email Sent',
          subTitle: 'A verification email has been sent to your email address. You must verify your email and phone number in order to continue.',
          buttons: ['OK']
        });

        alert.present();
        alert.onDidDismiss(() => {



        })

      }
    }
    catch (e) {
      console.error(e);

      let alert = this.alert.create({
        title: 'Error',
        subTitle: e,
        buttons: ['OK']
      });

      alert.present();
    }
  }



createEntry() : void
{
   let options 	: any		= { "key"   : "create" ,"uuid" : this.user.uuid , "firstName" : this.user.firstName, "lastName": this.user.lastName, "phoneNumber": this.user.phoneNumber, "emailAddress" : this.user.email },
       url       : any      	= 'http://localhost:80/data_marker/createUser.php';

   this.http.post(url, JSON.stringify(options))
   .subscribe((data : any) =>
   {
      
     console.log("success");
     console.log("jump " + this.user.uuid);
   },
   (error : any) =>
   {
      console.log("problem");

      let alert = this.alert.create({
        title: 'Error!',
        subTitle: 'Please ensure your device is connected to the internet.',
        buttons: ['OK']
      });

      alert.present();
   });
}


}
