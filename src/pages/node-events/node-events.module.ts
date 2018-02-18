import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeEventsPage } from './node-events';

@NgModule({
  declarations: [
    NodeEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeEventsPage),
  ],
})
export class NodeEventsPageModule {}
