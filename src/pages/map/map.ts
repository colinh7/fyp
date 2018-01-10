import { Http } from '@angular/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Alert, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { GoogleMaps } from '../../providers/google-maps';
declare var google;
declare var map;
declare var message;
declare var one;
declare var two;
declare var three;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  thirdPartyNodes: any;

  @ViewChild('map') mapElement;
  map: any;
  
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http, private toast: ToastController, private platform: Platform, private alertCtrl: AlertController, private network: Network, public maps: GoogleMaps) {
  
  



  }



  ionViewDidLoad(){

  this.maps.initMap(this.mapElement.nativeElement);
  console.log("hello");

    


 
  }

  ionViewWillEnter() {
   // var two = 52.668018;
    //var one = -8.630498;
    //var three = 100;
    //this.getThirdPartyMarkers();
    
    

  
  }
  
/*

  loadMap(){
    
    this.geolocation.getCurrentPosition().then((position) => {

    let defaultLatLng = new google.maps.LatLng(40.4040 , 60.4040);

    let defaultMapOptions = {
      center: defaultLatLng,
      zoom: 7,
      streetViewControl: false,
      fullscreenControl: false,
      rotateControl: false,
      mapTypeControl:false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    let mapOptions = {
      center: latLng,
      zoom: 14,
      streetViewControl: false,
      fullscreenControl: false,
      rotateControl: false,
      mapTypeControl:false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

 

  }, 
  

  );

 

  }

  getMarkers(lng,lat,maxDistance){
    
    this.http.get('https://api.openchargemap.io/v2/poi/?output=json&longitude='+lng+'&latitude='+lat+'&distance='+maxDistance+'&countrycode=IRL&maxresults=1000')
    .map(res => res.json())
    .subscribe(data => {
 
            
            this.addThirdPartyMarkersToMap(data);
 
        });
}


  getThirdPartyMarkers(){

    this.http.get('https://api.openchargemap.io/v2/poi/?output=json&countrycode=IRL&maxresults=1000')
    .map(res => res.json())
    .subscribe(data => {
    
      this.addThirdPartyMarkersToMap(data);
   
    });
   

  }

  clear(){
   // setMapOnAll(null);
  }

  addThirdPartyMarkersToMap(markers){
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.AddressInfo.Latitude, marker.AddressInfo.Longitude);
      var dogwalkMarker = new google.maps.Marker({map: this.map, position: position}); //, Title: thirdPartyMarkers.Title});
      dogwalkMarker.setMap(this.map);
    }

   
  }

  addMarker(){
    
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });
    
     let content = "<h4>Information!</h4>";         
    
     this.addInfoWindow(marker, content);
    
   }

   addInfoWindow(marker,content){
    
     let infoWindow = new google.maps.InfoWindow({
       content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }

*/
   

}

