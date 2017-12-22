import { Component } from '@angular/core';

import { MyAccountPage } from '../MyAccount/MyAccount';
import { SettingsPage } from '../settings/settings';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = MyAccountPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
