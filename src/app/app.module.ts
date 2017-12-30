import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { myAccountPage } from '../pages/myAccount/myAccount';
import { myAccountInfoPage } from '../pages/myAccountInfo/myAccountInfo'
import { SettingsPage } from '../pages/settings/settings';
import { myNodesPage } from '../pages/myNodes/myNodes';
import { myNodeInfoPage } from '../pages/myNodeInfo/myNodeInfo';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    MapPage,
    myAccountPage,
    myAccountInfoPage,
    myNodesPage,
    myNodeInfoPage,
    TabsPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    TabsPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
