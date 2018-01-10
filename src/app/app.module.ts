import { createAccountPage } from './../pages/createAccount/createAccount';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth/auth';

import { LoginPage } from '../pages/login/login';
import { myAccountPage } from '../pages/myAccount/myAccount';
import { myAccountInfoPage } from '../pages/myAccountInfo/myAccountInfo'
import { SettingsPage } from '../pages/settings/settings';
import { myUsagePage } from '../pages/myUsage/myUsage';
import { myNodesPage } from '../pages/myNodes/myNodes';
import { myNodeInfoPage } from '../pages/myNodeInfo/myNodeInfo';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation} from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http'
import { Network } from '@ionic-native/network';
import { GoogleMaps } from '../providers/google-maps';


@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    MapPage,
    myAccountPage,
    myAccountInfoPage,
    myNodesPage,
    myNodeInfoPage,
    LoginPage,
    createAccountPage,
    myUsagePage,
    TabsPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    MapPage,
    myAccountPage,
    myAccountInfoPage,
    myNodesPage,
    myNodeInfoPage,
    LoginPage,
    TabsPage
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Geolocation,
    Network,
    GoogleMaps
  ]
})
export class AppModule {}
