import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
declare var map;
declare var message;

 
@Injectable()
export class GoogleMaps {

    
 
    map: any;
    existingThirdPartyMarkers: any = [];
    maxDistance: any;
 
    constructor(public http: Http, public geolocation: Geolocation) {
 
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
    
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
    
          this.loadMarkers();
        //  this.removeMarker();
        
    
           google.maps.event.addListener(this.map, 'dragend', () => {
               this.loadMarkers();
              // this.removeMarker();
            
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
        
        this.http.get('https://api.openchargemap.io/v2/poi/?output=json&longitude='+lng+'&latitude='+lat+'&distance='+maxDistance+'&countrycode=IRL&maxresults=200')
        .map(res => res.json())
        .subscribe(markers => {
     
                
                this.addThirdPartyMarkers(markers);
     
            });
    }

    clear(){
        this.map.setMapOnAll(null);
    }
/*
    removeMarker(){

        let center = this.map.getCenter(),
        bounds = this.map.getBounds(),
        zoom = this.map.getZoom();
 
    // Convert to readable format
    let centerNorm = {
        latCenter: center.lat(),
        lngCenter: center.lng()
    };
        
  if (this.existingThirdPartyMarkers.length > 10){
 
    for( var i = 0; i<10; i++){
    this.existingThirdPartyMarkers[i].setMap(null)
    this.existingThirdPartyMarkers.shift()
    
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
   
    
}