import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { EditNodeDetailsPage } from './../edit-node-details/edit-node-details';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  authState: any = null;
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
  isOwner: any;
  break: any;

  constructor(public alert: AlertController, private afAuth: AngularFireAuth, public http: Http, public navCtrl: NavController, public navParams: NavParams) {



    this.userId = navParams.get("param7");
    console.log(this.userId)



    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

    this.userId = this.afAuth.auth.currentUser.uid;



    this.http.get('http://localhost:80/data_marker/myNodeData.php?userId=' + this.userId)
      .map(res => res.json())
      .subscribe(appMarkers => {

        this.setMarkerVariables(appMarkers);



      });




    console.log(this.endHour + "ENDHOUR");

    this.http.get('http://localhost:80/data_marker/myProfile.php?userId=' + this.userId)
      .map(res => res.json())
      .subscribe(u => {


        this.setUserVariables(u);


        console.log(this.startHour + "STARTTHOUR");


        if (u == null) {
          console.log("problem");
        }


      });



    this.http.get('http://localhost:80/data_marker/myNodeData.php?userId=' + this.userId)
      .map(res => res.json())
      .subscribe(u => {


        this.setOwnerVariable(u);




        if (u == null) {
          console.log("problem");
        }


      });



  }



  setOwnerVariable(user) {

    for (let u of user) {

      try {


        this.isOwner = u.nodeOwnerId;;


      } catch (error) {

      }

    }
  }



ownerCheck(){

  console.log("isWONER"+ this.isOwner);
  if (this.isOwner !== this.authState.uid){

    this.break = 1;

    let alert = this.alert.create({
      title: 'Error!',
      subTitle: 'You Do Not Have A Charge Point!',
      buttons: ['OK']
    });


    alert.onDidDismiss (res => {

      console.log("success");
      console.log("jump " + this.authState.uid);
      this.break = 1;


     
    });

    alert.present();
  
   
  }


}



  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  edit() {


    this.ownerCheck();

    this.navCtrl.push(EditNodeDetailsPage, {


      param7: this.userId,
      nodeAddress: this.nodeAddress,
      nodeId: this.nodeId,
      chargerType: this.chargerType,
      nodeOwnerId: this.nodeOwnerId,
      startHour: this.startHour,
      endHour: this.endHour,
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber



    });
  }


  setMarkerVariables(appMarkers) {

    for (let appMarker of appMarkers) {

      try {

        this.nodeAddress = appMarker.nodeAddress;
        this.nodeId = appMarker.nodeId;
        this.chargerType = appMarker.chargerType;
        this.nodeOwnerId = appMarker.nodeOwnerId;
        this.startHour = appMarker.startTime;
        this.endHour = appMarker.finishTime;
        this.costPer15Mins = appMarker.costPer15Mins;

        console.log(this.startHour + "STARTTHOUR");

      } catch (error) {

      }

    }
  }

  setUserVariables(user) {

    for (let u of user) {

      try {

        this.firstName = u.firstName;
        this.lastName = u.lastName;
        this.emailAddress = u.emailAddress;
        this.phoneNumber = u.phoneNumber;
        this.uuid = u.uuid;

        console.log(this.startHour + "STARTTHOUR");

      } catch (error) {

      }

    }
  }

  deleteNode() {


    this.ownerCheck();

    if (this.break == 1){
      
      this.navCtrl.setRoot(ProfilePage);
    }
    else{

    let options: any = { "nodeOwnerId": this.userId },
      url: any = 'http://localhost:80/data_marker/deleteNode.php';
    console.log(options);

    this.http.post(url, JSON.stringify(options))
      .subscribe((data: any) => {


        let alert = this.alert.create({
          title: 'Sorry to See You Go :(',
          subTitle: 'Your Charge Point Has Been Deleted',
          buttons: ['OK']
        });
       
      
        alert.onDidDismiss (res => {

          console.log("success");
          console.log("jump " + this.authState.uid);
          this.navCtrl.setRoot(ProfilePage);
  

         
        });
       
        alert.present();
        
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
}

}
