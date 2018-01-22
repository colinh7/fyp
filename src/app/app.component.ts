import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { User } from '../models/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  loader :any;
  user = {} as User;

  

  constructor(private afAuth: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

   // this.presentLoading();

    this.afAuth.authState.subscribe(data => {
      
          if(data.email &&data.uid){
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
          
          this.loader.dismiss();

          });
          
        }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Authenticating"
    });

    this.loader.present();
  }
  
  
}

  
