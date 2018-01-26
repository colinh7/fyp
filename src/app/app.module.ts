import { NodeBookingPage } from './../pages/node-booking/node-booking';
import { TabsPage } from './../pages/tabs/tabs';
import { ProfilePage } from './../pages/profile/profile';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPage } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth/auth';
import { Calendar } from '@ionic-native/calendar';
import { NgCalendarModule  } from 'ionic2-calendar';



import { myAccountInfoPage } from '../pages/myAccountInfo/myAccountInfo'
import { SettingsPage } from '../pages/settings/settings';
import { myUsagePage } from '../pages/myUsage/myUsage';
import { myNodesPage } from '../pages/myNodes/myNodes';
import { myNodeInfoPage } from '../pages/myNodeInfo/myNodeInfo';
import { MapPage } from '../pages/map/map';

import { Geolocation} from '@ionic-native/geolocation';
import { AngularFireModule } from "angularfire2"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http'
import { Network } from '@ionic-native/network';
import { GoogleMaps } from '../providers/google-maps';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";


@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    MapPage,
    myAccountInfoPage,
    myNodesPage,
    myNodeInfoPage,
    myUsagePage,
    ProfilePage,
    LoginPage,
    TabsPage,
    NodeBookingPage,
   
    
  
 
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    NgCalendarModule,
  

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    MapPage,
    myAccountInfoPage,
    myNodesPage,
    myNodeInfoPage,
    LoginPage,
    ProfilePage,
    TabsPage,
    NodeBookingPage

    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Geolocation,
    Network,
    GoogleMaps,

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}