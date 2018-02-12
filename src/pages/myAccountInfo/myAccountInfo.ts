import { Http} from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-myAccountInfo',
  templateUrl: 'myAccountInfo.html'
})
export class myAccountInfoPage {

  startTime:any;
  endeTime: any;

  constructor(public navCtrl: NavController, public http: Http) {

  }
  
createNode()
{

  
  
    this.http.get('http://localhost/data_marker/nodeData.php?number=RUNWITHTHERENEGADE')
    .map(res => res.json())
    .subscribe(thirdPartyMarkers => {


    

    });


}

}
