import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { Node } from '../../models/node';
/**
 * Generated class for the CreateNodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-node',
  templateUrl: 'create-node.html',
})
export class CreateNodePage {

  user = {} as User;
  node = {} as Node;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.node.address = navParams.get('param1');

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNodePage');
  }

createNode(){
console.log(this.node.address)
}




}
