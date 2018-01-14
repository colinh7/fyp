import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { MapPage } from '../map/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = ProfilePage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
