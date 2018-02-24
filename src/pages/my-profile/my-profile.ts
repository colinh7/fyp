import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  uuid:any;
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {

    

    this.userId = navParams.get("param7");

    
    this.http.get('http://localhost:80/data_marker/myNodeData.php?userId='+this.userId)
    .map(res => res.json())
    .subscribe(appMarkers => {


      this.nodeAddress = appMarkers.nodeAddress;
      this.nodeId = appMarkers.nodeId;
      this.chargerType = appMarkers.chargerType;
      this.nodeOwnerId = appMarkers.nodeOwnerId;
      this.startHour = appMarkers.startHour;
      this.endHour = appMarkers.endHour;
  
      console.log(this.startHour+ "STARTTHOUR");
      

      if (appMarkers == null) {
        console.log("problem");
      }
      

    });




    this.http.get('http://localhost:80/data_marker/myProfile.php?userId='+this.userId)
    .map(res => res.json())
    .subscribe(appMarkers => {


     
  
      console.log(this.startHour+ "STARTTHOUR");
      

      if (appMarkers == null) {
        console.log("problem");
      }
      

    });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

}
