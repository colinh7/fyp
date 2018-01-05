import { Http } from '@angular/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Alert, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

declare var google;
declare var map;
declare var message;

declare var Connection: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  thirdPartyNodes: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http, private toast: ToastController, private platform: Platform, private alertCtrl: AlertController, private network: Network) {

  }



  ionViewDidLoad(){
     this.loadMap();
     
 
  }

  ionViewDidEnter() {
  this.checkNetworkConnection();

  
  }


  checkNetworkConnection(){
    var networkState = this.network.type;

    if (networkState === 'none') {

      this.toast.create({
        message: `An Internet Connection is required`,
        duration: 3000
      }).present();
      
  } else {
    
  }


  }

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

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListenerOnce(map, 'idle', function(){
      
             //Load the markers
            // loadThirdPartyMarkers();
      
           });

  }, (err) => {
    console.log(err);
  
    //loadThirdPartyMarkers();

    
  });

 

  }

  loadThirdPartyMarkers(){

    this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
      this.thirdPartyNodes = data.data.children;
      
  });

  

  }

  addMarker(){
    
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });
    
     let content = "<h4>Information!</h4>";         
    
     this.addInfoWindow(marker, message, content);
    
   }

   addInfoWindow(marker, message, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: message
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }



}