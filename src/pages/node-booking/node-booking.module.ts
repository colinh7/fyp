import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeBookingPage } from './node-booking';

@NgModule({
  declarations: [
    NodeBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeBookingPage),
  ],
})
export class NodeBookingPageModule {}
