import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNodeDetailsPage } from './my-node-details';

@NgModule({
  declarations: [
    MyNodeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNodeDetailsPage),
  ],
})
export class MyNodeDetailsPageModule {}
