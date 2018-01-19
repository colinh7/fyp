import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNodePage } from './create-node';

@NgModule({
  declarations: [
    CreateNodePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNodePage),
  ],
})
export class CreateNodePageModule {}
