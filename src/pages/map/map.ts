import { InfoWindowObservable } from './../../models/infoWindowObservable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Alert, Platform, AlertController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
//import { GoogleMaps } from '../../providers/google-maps';
import { Node } from '../../models/node'




declare var google;
declare var map;
declare var message;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  thirdPartyNodes: any;
  node = {} as Node;
  infoWindowObservable = {} as InfoWindowObservable;

  @ViewChild('map') mapElement;
  map: any;
  existingThirdPartyMarkers: any = [];
  existingAppMarkers: any = [];
  maxDistance: any;
  geocoder: any;
  markerApp: any;
  lngApp: any;
  latApp: any;
  latLngApp: any;
  infoWindow: any = new google.maps.InfoWindow({
      size: new google.maps.Size(150, 300)
  })
  markerButton: any;
  deleteMarkerButton: any;
  counter = 0;
  appMarkers = [];
  disabled: boolean;
  infoWindowChecker: number;
  addNodeClicked: boolean;
  
  
  constructor(public events: Events, private afAuth: AngularFireAuth, public navCtrl: NavController, public geolocation: Geolocation, public http: Http, private toast: ToastController, private platform: Platform, private alertCtrl: AlertController, private network: Network) {
  
  
   

  }



  ionViewDidLoad(){
    this.afAuth.authState.subscribe(data => console.log(data))

    this.initMap(this.mapElement.nativeElement);
    console.log("hello");
    console.log('ionViewDidLoad hello');
  }

  ionViewWillEnter() {
  }


addNode(){

  if (this.addNodeClicked === true){
    let alert = this.alertCtrl.create({
      title: 'Node Already Placed!',
      subTitle: 'Only One node can be created at a time! Please delete the current node to create another.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        
      

        
        
      ]
    });
    
    this.map.setCenter(this.markerApp.position);
  }
  else{

  let alert = this.alertCtrl.create({
      title: 'Create A Node!',
      inputs: [
        {
          name: 'address',
          placeholder: 'Node Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Node',
          handler: data => {
            
            this.node.address = data.address;
            console.log(data.address);

        }
        }
      ]
    });
    alert.present();
    alert.onDidDismiss(() => {

      this.geocodeAddress(this.node.address);
      //if (this.infoWindowObservable.true === 1){
        //this.navCtrl.push("CreatNodePage");
        
      //}
  
      })
  
    }

  
  
}

initMap(mapElement){
  this.infoWindowObservable.true = 0;    
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


console.log(this.disabled);

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

this.map = new google.maps.Map(mapElement, mapOptions);


//google.maps.event.addListener(this.markerApp, 'dragend', () => {
//  var positionApp = this.markerApp.getPosition();
//this.latLngToAddress(positionApp);
// console.log(positionApp);

//  });


google.maps.event.addListenerOnce(this.map, 'idle', () => {

  this.loadMarkers();


   google.maps.event.addListener(this.map, 'dragend', () => {
       this.loadMarkers();
       this.removeMarkers();

    
   });

});

google.maps.event.addListener(this.infoWindow, 'domready', () => {
  document.getElementById('tap').addEventListener('click', () => {
  //alert('Clicked');
  console.log("touch");
  
  
  this.infoWindowObservable.true =this.infoWindowObservable.true + 2;
 
  this.changePage();
  
  
  });
  });
  

}, 


);




}

loadMarkers(){

let center = this.map.getCenter(),
bounds = this.map.getBounds(),
zoom = this.map.getZoom();

// Convert to readable format
let centerNorm = {
lat: center.lat(),
lng: center.lng()
};

let boundsNorm = {
northEast: {
    lat: bounds.getNorthEast().lat(),
    lng: bounds.getNorthEast().lng()
},
southWest: {
    lat: bounds.getSouthWest().lat(),
    lng: bounds.getSouthWest().lng()
}
};

let boundingRadius = this.getBoundingRadius(centerNorm, boundsNorm);


let  lng = centerNorm.lng;
let  lat = centerNorm.lat;
this.maxDistance = boundingRadius;


this.getMarkers(lng,lat,this.maxDistance);


}

getMarkers(lng,lat,maxDistance){

this.http.get('https://api.openchargemap.io/v2/poi/?output=json&longitude='+lng+'&latitude='+lat+'&distance='+maxDistance+'&countrycode=IRL&maxresults=10')
.map(res => res.json())
.subscribe(markers => {

        
        this.addThirdPartyMarkers(markers);

    });
}

/*

removeMarkers(){

let center = this.map.getCenter(),
bounds = this.map.getBounds(),
zoom = this.map.getZoom();

// Convert to readable format
let centerNorm = {
latCenter: center.lat(),
lngCenter: center.lng()
};



if (this.existingThirdPartyMarkers.length > 100){

for( let i = 0; i < 50; i++){
this.existingThirdPartyMarkers[i].marker.setMap(null)
this.existingThirdPartyMarkers.shift(1);
}

}
}




*/
addThirdPartyMarkers(markers){

let marker;
let markerLatLng;
let lat;
let lng;

 for(let marker of markers) {
          
   lat = marker.AddressInfo.Latitude;
   lng = marker.AddressInfo.Longitude;

  markerLatLng = new google.maps.LatLng(lat, lng);

    if(!this.markerExists(lat, lng)){

        marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: markerLatLng
        });

        let markerData = {
            lat: lat,
            lng: lng,
            marker: marker
        };

      this.existingThirdPartyMarkers.push(markerData);
  
   }

       
}
}




markerExists(lat, lng){

let exists = false;

    for(let marker of this.existingThirdPartyMarkers) {
       if(marker.lat === lat && marker.lng === lng){
           exists = true;
       }
    }

   return exists;
}



getBoundingRadius(center, bounds){
return this.getDistanceBetweenPoints(center, bounds.northEast, 'km');   
}

getDistanceBetweenPoints(pos1, pos2, units){

let earthRadius = {
    miles: 3958.8,
    km: 6371
};

let R = earthRadius[units || 'miles'];
let lat1 = pos1.lat;
let lon1 = pos1.lng;
let lat2 = pos2.lat;
let lon2 = pos2.lng;

let dLat = this.toRad((lat2 - lat1));
let dLon = this.toRad((lon2 - lon1));
let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
Math.sin(dLon / 2) *
Math.sin(dLon / 2);
let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
let d = R * c;

return d;

}

toRad(x){
return x * Math.PI / 180;
}



addMarker(){

let alert = this.alertCtrl.create({
title: 'Create A Charging Point',
subTitle: "Please enter the address oof the node you wish to create",
inputs: [
    {
    name: 'address',
    placeholder: 'Node Address' 
}
],
buttons: [
    {
    text:'OK',
    role: 'OK'
},
    {
    text: 'Cancel',
    role:  'Cancel'}
]

});

if (alert){
  console.log("hello");}



/*  let marker = new google.maps.Marker({
map: this.map,
animation: google.maps.Animation.DROP,
position: this.map.getCenter()
});

let content = "<h4>Information!</h4>";      

this.addInfoWindow(marker, content);
this.existingAppMarkers.push(marker);
*/
}


addInfoWindow(marker,content){

let infoWindow = new google.maps.InfoWindow({
content,
closeBoxURL: ""
});

google.maps.event.addListener(marker, 'click', () => {
infoWindow.open(this.map, marker);
});

}

/*

adddThirdPartyMarkers(markers){

    let marker;
    let markerLatLng;
    let lat;
    let lng;

     for(let marker of markers) {
              
       lat = marker.AddressInfo.Latitude;
       lng = marker.AddressInfo.Longitude;
 
      markerLatLng = new google.maps.LatLng(lat, lng);
 
        if(!this.markerExists(lat, lng)){
 
            marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: markerLatLng
            });
   
            let markerData = {
                lat: lat,
                lng: lng,
                marker: marker
            };
 
          this.existingAppMarkers.push(markerData);
      
       }
    
           
    }
}
*/

removeMarkers(){
    
            let center = this.map.getCenter(),
            bounds = this.map.getBounds(),
            zoom = this.map.getZoom();
     
        // Convert to readable format
        let centerNorm = {
            latCenter: center.lat(),
            lngCenter: center.lng()
        };
            
    
    
        if (this.existingThirdPartyMarkers.length > 200){
    
        for( let i = 0; i < 100; i++){
            this.existingThirdPartyMarkers[i].marker.setMap(null)
            this.existingThirdPartyMarkers.shift(1);
    }
    
    }
    }



geocodeAddress(address){

this.markerButton = '<div class="infowindow"><p id="tap">Add Node</p></div>';
this.deleteMarkerButton = '<button id="deleteButton">Delete</button>';
this.geocoder = new google.maps.Geocoder();
var iconBase = "assets/imgs/green_markerN.png";
this.geocoder.geocode({'address': address}, (results, status) => {

if (status === 'OK') {

    this.map.setCenter(results[0].geometry.location);
    this.markerApp = new google.maps.Marker({
      map: this.map,
      position: results[0].geometry.location,
      draggable: true,
      icon: iconBase,
      id: this.counter

    });

 this.addNodeClicked = true;
  
   
 
    



    console.log(this.markerApp);
    this.latLngToAddress();
    console.log("hello");
    this.node.address = results[0].geometry.location
    console.log(this.node.address);
    console.log("icon");
    this.addMarkerButton();

    google.maps.event.addListener(this.markerApp, 'dragend', () => {
        this.loadMarkers();
        this.removeMarkers();
        this.latLngToAddress();
        this.addMarkerButton();
        this.disabled = false;
        
    });

    google.maps.event.addListener(this.markerApp, 'click', () => {
      
  
      if (this.isInfoWindowOpen(this.infoWindow)){
      
    } else {
      this.infoWindow.open(this.map,this.markerApp);
    }
      
      
  });

    
  google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
      
    
    if (this.isInfoWindowOpen(this.infoWindow)){
      console.log("open")
   } else {
     this.infoWindow.open(this.map,this.markerApp);
   }
    
});

 

   

  } else {
    let alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'Node creation was unsuccesful for the following reason:' + status,
        buttons: ['OK'],
       
      });
      
      alert.present();
      alert.onDidDismiss(() => {

        
        
       
        
        
        })

    
        

    
}




});

}

latLngToAddress(){

var latApp = this.markerApp.position;
var latLngApp = this.markerApp.position;
               
             
this.geocoder = new google.maps.Geocoder();

this.geocoder.geocode({'latLng': latLngApp}, (results, status) => {

if (status === 'OK') {
    
   // console.log(results[0].formatted_address);
   console.log(results[0]);
    this.node.address = results[0].formatted_address;
    this.addMarkerButton();
    
      
    
  } else {
    let alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'Node creation was unsuccesful for the following reason:' + status,
        buttons: ['OK'],
       
      });
      
      alert.present();
    
}



});
   


}

addMarkerButton(){
this.infoWindow.setContent( this.markerButton + this.deleteMarkerButton + this.node.address);
  
if (this.isInfoWindowOpen(this.infoWindow)){
       
} else {
  this.infoWindow.open(this.map,this.markerApp);
}
  

/*
google.maps.event.addListener(this.infoWindow, 'domready', () => {
document.getElementById('tap').addEventListener('click', () => {
//alert('Clicked');
console.log("touch");

console.log(this.infoWindowObservable.true);
this.infoWindowObservable.true =this.infoWindowObservable.true + 1;
console.log(this.infoWindowObservable.true);
this.changePage();

});
});
*/

google.maps.event.addListener(this.infoWindow, 'domready', () => {
  document.getElementById('deleteButton').addEventListener('click', () => {
    var button = document.getElementById('deleteButton');
    this.markerApp.setMap(null);
    

      this.disabled = false;
      console.log(this.disabled)
      this.addNodeClicked = false;
  


    console.log("wadddduppppp");
  
  });
  });

 



}

isInfoWindowOpen(infoWindow){
  var map = this.infoWindow.getMap();
  return (map !== null && typeof map !== "undefined");

}      

changePage(){
  console.log()
console.log(this.infoWindowObservable)
if (this.infoWindowObservable.true  === 2){
 this.navCtrl.push("CreateNodePage", { 
   param1: this.node.address
 });
 console.log(this.infoWindowObservable.true);
 this.infoWindowObservable.true = 0;
 console.log(this.infoWindowObservable)
}
}


    //this.navCtrl.push("CreateNodePage");
  /*
    let alert = this.alertCtrl.create({
    title: 'Create A Charging Point',
    subTitle: "Please enter the address of the node you wish to create",
    inputs: [
        {
        name: 'address',
        placeholder: 'Node Address' 
    },
        {
        type:'radio',
        name: 'number of nodes',
        placeholder: 'Number of nodes' 
    }
    ],
    buttons: [
        {
        text:'Next',
        role: 'OK',
        handler: data => {
          this.alertCtrl.create
        }
},
        {
        text: 'Cancel',
        role:  'Cancel'}
]

  });

  alert.present();



  
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