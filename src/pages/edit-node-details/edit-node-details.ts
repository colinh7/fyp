import { MyProfilePage } from './../my-profile/my-profile';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';



/**
 * Generated class for the EditNodeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-node-details',
  templateUrl: 'edit-node-details.html',
})
export class EditNodeDetailsPage {

  userId: any;
  nodeAddress: any;
  nodeId: any;
  chargerType: any;
  nodeOwnerId: any;
  startHour: any;
  endHour: any;
  firstName: any;
  lastName: any;
  emailAddress: any;
  phoneNumber: any;
  uuid: any;
  costPer15Mins: any;

  constructor(public alert: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {


    this.userId = navParams.get("param7");
    console.log(this.userId)

    this.nodeAddress = navParams.get("nodeAddress");
    this.nodeId = navParams.get("nodeId");
    this.chargerType = navParams.get("chargerType");
    this.nodeOwnerId = navParams.get("nodeOwnerId");
    this.startHour = navParams.get("startHour");
    this.endHour = navParams.get("endHour");
    this.firstName = navParams.get("firstName");
    this.lastName = navParams.get("lastName");
    this.emailAddress = navParams.get("emailAddress");
    this.phoneNumber = navParams.get("phoneNumber");
    this.costPer15Mins = navParams.get("costPer15Mins");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNodeDetailsPage');
  }



  editNode() {




    if (this.chargerType != null && this.startHour != null) {


      var start: number = this.startHour;
      var end: number = this.endHour;
      var diff = end -start;

      console.log(this.startHour);
      console.log(this.endHour);
      console.log("hello");


      if (diff > 0) {



        let options: any = { 'chargerType': this.chargerType, 'startTime': this.startHour, 'finishTime': this.endHour, "costPer15Mins": this.costPer15Mins, "userId": this.userId },
          url: any = 'http://colinfyp.bitnamiapp.com/data_marker/editNode.php';
        console.log(options);

        this.http.post(url, JSON.stringify(options))
          .subscribe((data: any) => {
console.log(options);

            this.navCtrl.setRoot(ProfilePage);
          },
          (error: any) => {
            console.log("HEYY" + error);

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
