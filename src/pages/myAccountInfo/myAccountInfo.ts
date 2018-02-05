import { Http} from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-myAccountInfo',
  templateUrl: 'myAccountInfo.html'
})
export class myAccountInfoPage {

  constructor(public navCtrl: NavController, public http: Http) {

  }
  firstName : string = "pin";
  lastName: string = "awesome";
  uuid : any ="oiaufes938403984er398r4cme";
  emailAddress: any = "me@me.com"
  phoneNumber: number = 39847309439;



  sendUserDetails(data) {

    

    this.http.post('http://localhost:80/data_marker/insertAppUser.php', JSON.stringify(data))
 
    

}

createEntry() : void
{
   let options 	: any		= { "key"   : "create" ,"uuid" : this.uuid, "firstName" : this.firstName, "lastName": this.lastName, "phoneNumber": this.phoneNumber, "emailAddress" : this.emailAddress },
       url       : any      	= 'http://localhost:80/data_marker/test.php';

   this.http.post(url, JSON.stringify(options))
   .subscribe((data : any) =>
   {
      
     console.log("success");
   },
   (error : any) =>
   {
      console.log("problem");
   });
}
}