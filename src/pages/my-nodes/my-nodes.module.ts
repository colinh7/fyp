import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNodesPage } from './my-nodes';

@NgModule({
  declarations: [
    MyNodesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNodesPage),
  ],
})
export class MyNodesPageModule {}
