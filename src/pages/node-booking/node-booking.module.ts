import { NgCalendarModule } from 'ionic2-calendar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeBookingPage } from './node-booking';

@NgModule({
  declarations: [
    NodeBookingPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(NodeBookingPage),
  ],
})
export class NodeBookingPageModule {}
