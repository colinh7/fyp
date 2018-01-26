import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEventsPage } from './user-events';

@NgModule({
  declarations: [
    UserEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserEventsPage),
  ],
})
export class UserEventsPageModule {}
