import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { myNodeInfoPage } from '../myNodeInfo/myNodeInfo'
import { Http } from '@angular/http';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';


@Component({
  selector: 'page-myNodes',
  templateUrl: 'myNodes.html',
})
export class myNodesPage {

  constructor(public navCtrl: NavController, public http: Http) {
  }
markers: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNodesPage');
    this.getAppMarkers(); 
    console.log(this.markers);
  }


  viewMyNodeInfo() {
    this.navCtrl.push(myNodeInfoPage)

  }


  getAppMarkers() {
    

    this.http.get('http://localhost:80/data_marker/appMarkerData.php')
      .map(res => res.json())
      .subscribe(appMarkers => {

this.markers = appMarkers;
console.log(this.markers);
console.log("yo")

if (appMarkers == null){
  console.log("problem");
}
        //this.addAppMarkers(thirdPartyMarkers);

      });
  }


}
