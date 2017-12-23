import { Component } from '@angular/core';

import { myAccountPage } from '../myAccount/myAccount';
import { SettingsPage } from '../settings/settings';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = myAccountPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
