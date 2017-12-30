import { loginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any =TabsPage;
  loader :any;

  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public auth: Auth, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.presentLoading();

    this.auth.login().then((isLoggedIn) => {
      
          if(isLoggedIn){
            this.rootPage = TabsPage;
          } else {
            this.rootPage = loginPage;
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


