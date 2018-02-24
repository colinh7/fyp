import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNodeCalendarPage } from './my-node-calendar';

@NgModule({
  declarations: [
    MyNodeCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNodeCalendarPage),
  ],
})
export class MyNodeCalendarPageModule {}
