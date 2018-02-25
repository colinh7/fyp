import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNodeBookingFreePage } from './my-node-booking-free';

@NgModule({
  declarations: [
    MyNodeBookingFreePage,
  ],
  imports: [
    IonicPageModule.forChild(MyNodeBookingFreePage),
  ],
})
export class MyNodeBookingFreePageModule {}
