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
  authState: any = null;
  start: any;


  constructor(private afAuth: AngularFireAuth, public alert: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {


    this.node.address = navParams.get('param1');
    this.node.lat = navParams.get('param2');
    this.node.lng = navParams.get('param3');


    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNodePage');
  }

  createNode(): void {


   console.log(this.node.availabilityTimeFinish)

  
   if (this.node.chargerType != null && this.node.availabilityTimeStart != null) {

  
  
  
      
      console.log(this.node.availabilityTimeStart);
      console.log(this.node.availabilityTimeFinish);
      console.log("hello");


      if (this.node.availabilityTimeStart < this.node.availabilityTimeFinish) {

        console.log(this.node.availabilityTimeStart)

        let options: any = { 'chargerType': this.node.chargerType, 'lat': this.node.lat, 'lng': this.node.lng, 'address': this.node.address, 'uuid': this.authState.uid, 'startTime': this.node.availabilityTimeStart, 'finishTime': this.node.availabilityTimeFinish },
          url: any = 'http://localhost:80/data_marker/createNode.php';
          console.log(options);

        this.http.post(url, JSON.stringify(options))
          .subscribe((data: any) => {

            console.log("success");
            console.log("jump " + this.authState.uid);
           // this.navCtrl.setRoot(TabsPage);
          },
          (error: any) => {
            console.log("problem");

            let alert = this.alert.create({
              title: 'Error!',
              subTitle: 'Please ensure your device is connected to the internet.',
              buttons: ['OK']
            });

            alert.present();
          });
      }
      else {
        console.log("error2")

        let alert = this.alert.create({
          title: 'Error!',
          subTitle: 'Start Time cannot be later than finish time',
          buttons: ['OK']
        });

        alert.present();
      }

    }
    else {
      console.log("error1")

      let alert = this.alert.create({
        title: 'Error!',
        subTitle: 'Please ensure all fields are filled out.',
        buttons: ['OK']
      });

      alert.present();
    }

  }


}
