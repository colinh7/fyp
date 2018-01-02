import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement;
  map: any;
  
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
      this.initMap();

  }

  initMap(){

    let latLng = new google.maps.LatLng( 34.9290, 138.6010);
    
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


}