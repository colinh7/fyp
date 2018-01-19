import { CreateNodePage } from './../pages/create-node/create-node';
import { Node } from './../models/node';
import { InfoWindowObservable } from './../models/infoWindowObservable';
import { NavController, AlertController, IonicPage, Platform, Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
  


declare var google;
declare var map;
declare var message; 


 
@Injectable()
export class GoogleMaps {

    infoWindowObservable = {} as InfoWindowObservable;
    node = {} as Node;
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
    
  
  
 
    constructor(public events: Events, public http: Http, public geolocation: Geolocation, public alert: AlertController) {
 
    }


    
 
    initMap(mapElement){
        
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
    
    let alert = this.alert.create({
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
    this.geocoder = new google.maps.Geocoder();
    var iconBase = "assets/imgs/green_markerN.png";
    this.geocoder.geocode({'address': address}, (results, status) => {

        if (status === 'OK') {
            
            this.map.setCenter(results[0].geometry.location);
            this.markerApp = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              draggable: true,
              icon: iconBase

            });
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
               

                
                
            });
        
          } else {
            let alert = this.alert.create({
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
            
            console.log(results[0].formatted_address);
            this.node.address = results[0].formatted_address;
            this.addMarkerButton();

            
          } else {
            let alert = this.alert.create({
                title: 'ERROR',
                subTitle: 'Node creation was unsuccesful for the following reason:' + status,
                buttons: ['OK'],
               
              });
              
              alert.present();
            
        }

       
        
      });
    
}

addMarkerButton(){
this.infoWindow.setContent( this.markerButton + this.node.address);
this.infoWindow.open(this.map,this.markerApp);

google.maps.event.addListener(this.infoWindow, 'domready', () => {
    document.getElementById('tap').addEventListener('click', () => {
      //alert('Clicked');
      console.log("touch");
      this.infoWindowObservable.true = 1;
      this.changePage();
    
    });
  });

}

changePage(){

    if (this.infoWindowObservable.true === 1){
        this.events.publish('markerAdded', this.infoWindowObservable.true, Date.now());
        
    }
}

}
