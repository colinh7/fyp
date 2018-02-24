import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNodeDetailsPage } from './edit-node-details';

@NgModule({
  declarations: [
    EditNodeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditNodeDetailsPage),
  ],
})
export class EditNodeDetailsPageModule {}
