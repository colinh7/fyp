import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeBookingPage } from './node-booking';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    NodeBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeBookingPage),
    NgCalendarModule
  ],
})
export class NodeBookingPageModule {}
