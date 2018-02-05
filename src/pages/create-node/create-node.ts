import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { Node } from '../../models/node';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from "angularfire2/auth"
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
  

  constructor(private afAuth: AngularFireAuth, public alert: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {


    this.node.address = navParams.get('param1');
    this.node.lat = navParams.get('param2');
    this.node.lng = navParams.get('param3');
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNodePage');
    console.log(this.node.lat);
    console.log(this.user.uuid)
  }

  createNode() : void
  {
    console.log("hellp" + this.node.chargerType);
     let options 	: any		= { "key"   : "create" ,"chargerType" : this.node.chargerType,"lat" : this.node.lat , "lng" : this.node.lng, "address": this.node.address, "uuid" : this.afAuth.auth.currentUser.uid },
         url       : any      	= 'http://localhost:80/data_marker/createNode.php';
  
     this.http.post(url, JSON.stringify(options))
     .subscribe((data : any) =>
     {
        
       console.log("success");
       console.log("jump " + this.user.uuid);
       this.navCtrl.setRoot(TabsPage);
     },
     (error : any) =>
     {
        console.log("problem");
  
        let alert = this.alert.create({
          title: 'Error!',
          subTitle: 'Please ensure your device is connected to the internet.',
          buttons: ['OK']
        });
  
        alert.present();
     });
  }
  


}
