import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCalendarPage } from './my-calendar';

@NgModule({
  declarations: [
    MyCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCalendarPage),
  ],
})
export class MyCalendarPageModule {}
