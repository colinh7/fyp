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
import { Content } from 'ionic-angular/components/content/content';
import { CreateNodePage } from '../create-node/create-node';
import { NodeBookingPage } from '../node-booking/node-booking';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';




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
  //latApp: any;
  //latLngApp: any;
  infoWindow: any = new google.maps.InfoWindow({
    size: new google.maps.Size(150, 300)
  })
  markerButton: any;
  deleteMarkerButton: any;
  counter = 0;
  appMarkers = [];
  disabled: boolean;
  //infoWindowChecker: number;
  addNodeClicked: boolean;
  thirdPartyMarkerInfoWindow: any = new google.maps.InfoWindow();
  dbMarker: any;
  appInfoWindow: any = new google.maps.InfoWindow({
    size: new google.maps.Size(150, 300)
  })
  eventPageButton: any;
  appMarker: any;

  constructor(public events: Events, private afAuth: AngularFireAuth, public navCtrl: NavController, public geolocation: Geolocation, public http: Http, private toast: ToastController, private platform: Platform, private alertCtrl: AlertController, private network: Network) {




  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => console.log(data))

    this.initMap(this.mapElement.nativeElement);
    console.log("hello");
    console.log('ionViewDidLoad hello');
  }

  ionViewWillEnter() {
  }



  initMap(mapElement) {
    this.infoWindowObservable.true = 0;
    this.geolocation.getCurrentPosition().then((position) => {

      let defaultLatLng = new google.maps.LatLng(40.4040, 60.4040);

      let defaultMapOptions = {
        center: defaultLatLng,
        zoom: 7,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        mapTypeControl: false,
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
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        clickableIcons: false,
      };

      this.map = new google.maps.Map(mapElement, mapOptions);






      google.maps.event.addListenerOnce(this.map, 'idle', () => {

        this.loadThirdPartyMarkers();
        this.loadAppMarkers();


        google.maps.event.addListener(this.map, 'dragend', () => {
          this.loadThirdPartyMarkers();
          // this.removeMarkers();
          this.loadAppMarkers();


        });

      });

      google.maps.event.addListenerOnce(this.map, 'dragend', () => {




      });

      google.maps.event.addListener(this.map, 'click', () => {
        this.thirdPartyMarkerInfoWindow.close();
        console.log("close");
        this.appInfoWindow.close();
      });

      google.maps.event.addListener(this.infoWindow, 'domready', () => {
        document.getElementById('tap').addEventListener('click', () => {
          //alert('Clicked');
          console.log("touch");


          this.infoWindowObservable.true = this.infoWindowObservable.true + 2;

          this.loadCreateNodePage();



        });


      });

      google.maps.event.addListener(this.appInfoWindow, 'domready', () => {
        document.getElementById('book').addEventListener('click', () => {

          this.navCtrl.push(NodeBookingPage);


        });


      });










    },


    );




  }

  loadAppMarkers() {


    this.http.get('http://localhost:80/data_marker/appMarkerData.php')
      .map(res => res.json())
      .subscribe(appMarkers => {

        this.appMarkers = appMarkers;
        console.log(this.appMarkers);
        console.log("yo")

        if (appMarkers == null) {
          console.log("problem");
        }
        this.addAppMarkers(appMarkers);

      });
  }


  addAppMarkers(markers) {
    console.log("loadingAppMarkers")
    let thirdPartyMarker;
    let markerLatLng;
    let lat;
    let lng;
    let address;
    let Title;
    let AddressLine1;
    let AddressLine2;
    let Town;
    let StateOrProvince;
    let Country;
    let Membership;
    let NumberOfPoints;
    let GeneralComments;
    let Connections;
    var bookButton;
    let chargertype;

    for (let marker of markers) {

      try {

        lat = marker.lat;
        lng = marker.lng;
        Title = marker.name;
        AddressLine1 = marker.address
        chargertype = marker.chargerType
        /*
              Town = marker.AddressInfo.Town;
              //Country = marker.AddressInfo.Country.Title;
              //GeneralComments = marker.GeneralComments;
        
              try {
                Membership = marker.UsageType.IsMembershipRequired;
                Connections = marker.Connections.ConnectionType.Title;
                NumberOfPoints = marker.NumberOfPoints;
        
        
              } catch (e) {
        
              }
        */
        address = Title.toString() + ", " + AddressLine1.toString(); //+ ", " + Town.toString() + ", " + Country + ". Membership Required: " + Membership + " Connections: " + Connections + " Number of Points: " + NumberOfPoints + " General Comments: " + GeneralComments;

      }
      catch (error) {

      }
      markerLatLng = new google.maps.LatLng(lat, lng);

      if (!this.markerExists(lat, lng)) {


        marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: markerLatLng,
          clickable: true,
          icon: "assets/imgs/green_markerN.png"

        });


        bookButton = '<button id="book">Book</button>';


        google.maps.event.addListener(marker, 'click', (function (marker, content, appInfoWindow) {
          return function () {
            appInfoWindow.setContent(bookButton + " " + "Address: " + AddressLine1 + " Connection Type: " + chargertype);
            appInfoWindow.open(map, marker);




          };
        })(marker, address, this.appInfoWindow));




        let markerData = {
          lat: lat,
          lng: lng,
          marker: marker
        };


        this.existingThirdPartyMarkers.push(markerData);
      }




    }
  }



  addNode() {

    if (this.addNodeClicked === true) {
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
    else {

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


      })

    }



  }



  loadThirdPartyMarkers() {

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


    let lng = centerNorm.lng;
    let lat = centerNorm.lat;
    this.maxDistance = boundingRadius;


    this.getThirdPartyMarkers(lng, lat, this.maxDistance);


  }

  getThirdPartyMarkers(lng, lat, maxDistance) {

    this.http.get('https://api.openchargemap.io/v2/poi/?output=json&longitude=' + lng + '&latitude=' + lat + '&distance=' + maxDistance + '&countrycode=IRL&maxresults=10')
      .map(res => res.json())
      .subscribe(thirdPartyMarkers => {


        this.addThirdPartyMarkers(thirdPartyMarkers);

      });
  }


  addThirdPartyMarkers(markers) {

    let thirdPartyMarker;
    let markerLatLng;
    let lat;
    let lng;
    let address;
    let Title;
    let AddressLine1;
    let AddressLine2;
    let Town;
    let StateOrProvince;
    let Country;
    let Membership;
    let NumberOfPoints;
    let GeneralComments;
    let Connections;

    for (let marker of markers) {

      lat = marker.AddressInfo.Latitude;
      lng = marker.AddressInfo.Longitude;
      Title = marker.AddressInfo.Title;
      AddressLine1 = marker.AddressInfo.AddressLine1;

      Town = marker.AddressInfo.Town;
      Country = marker.AddressInfo.Country.Title;
      GeneralComments = marker.GeneralComments;

      try {
        Membership = marker.UsageType.IsMembershipRequired;
        Connections = marker.Connections.ConnectionType.Title;
        NumberOfPoints = marker.NumberOfPoints;



        address = Title.toString() + ", " + AddressLine1.toString() + ", " + Town.toString() + ", " + Country + ". Membership Required: " + Membership + " Connections: " + Connections + " Number of Points: " + NumberOfPoints + " General Comments: " + GeneralComments;

      } catch (e) {

      }

      markerLatLng = new google.maps.LatLng(lat, lng);

      if (!this.markerExists(lat, lng)) {


        marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: markerLatLng,
          clickable: true,

        });


        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow, openWindow) {
          return function () {
            infowindow.setContent(content);
            infowindow.open(map, marker);
            var close = function () {
              this.isInfoWindowOpen()
            }


          };
        })(marker, address, this.thirdPartyMarkerInfoWindow, this.appInfoWindow));



        let markerData = {
          lat: lat,
          lng: lng,
          marker: marker
        };


        this.existingThirdPartyMarkers.push(markerData);
      }




    }
  }


  closeAppInfoWIndow() {
    if (this.isInfoWindowOpen(this.appInfoWindow)) {

      this.appInfoWindow.close();
    }

  }

  markerExists(lat, lng) {

    let exists = false;

    for (let marker of this.existingThirdPartyMarkers) {
      if (marker.lat === lat && marker.lng === lng) {
        exists = true;
      }
    }

    return exists;
  }



  getBoundingRadius(center, bounds) {
    return this.getDistanceBetweenPoints(center, bounds.northEast, 'km');
  }

  getDistanceBetweenPoints(pos1, pos2, units) {

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

  toRad(x) {
    return x * Math.PI / 180;
  }



  addMarker() {

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
          text: 'OK',
          role: 'OK'
        },
        {
          text: 'Cancel',
          role: 'Cancel'
        }
      ]

    });

    if (alert) {
      console.log("hello");
    }



    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });



  }



  /*
    removeMarkers() {
  
      let center = this.map.getCenter(),
        bounds = this.map.getBounds(),
        zoom = this.map.getZoom();
  
      // Convert to readable format
      let centerNorm = {
        latCenter: center.lat(),
        lngCenter: center.lng()
      };
  
  
  
      if (this.existingThirdPartyMarkers.length > 100) {
  
        for (let i = 0; i < 20; i++) {
          this.existingThirdPartyMarkers[i].marker.setMap(null)
          this.existingThirdPartyMarkers.shift(1);
        }
  
      }
    }
  */


  geocodeAddress(address) {

    this.markerButton = '<button id="tap">Add Node</button>';
    this.deleteMarkerButton = '<button id="deleteButton">Delete</button>';
    this.geocoder = new google.maps.Geocoder();
    var iconBase = "assets/imgs/green_markerN.png";
    this.geocoder.geocode({ 'address': address }, (results, status) => {

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
        this.latLngToAddress();
        this.node.address = results[0].geometry.location
        this.addMarkerButton();

        google.maps.event.addListener(this.markerApp, 'dragend', () => {
          this.loadThirdPartyMarkers();
          //   this.removeMarkers();
          this.latLngToAddress();
          this.addMarkerButton();
          this.disabled = false;

        });

        google.maps.event.addListener(this.markerApp, 'click', () => {


          if (this.isInfoWindowOpen(this.infoWindow)) {

          } else {
            this.infoWindow.open(this.map, this.markerApp);
          }


        });


        google.maps.event.addListener(this.infoWindow, 'closeclick', () => {


          if (this.isInfoWindowOpen(this.infoWindow)) {
            console.log("open")
          } else {
            this.infoWindow.open(this.map, this.markerApp);
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

  latLngToAddress() {

    var latApp = this.markerApp.position;
    var latLngApp = this.markerApp.position;
    console.log(latLngApp)


    this.geocoder = new google.maps.Geocoder();

    this.geocoder.geocode({ 'latLng': latLngApp }, (results, status) => {

      if (status === 'OK') {

        // console.log(results[0].formatted_address);
        console.log(results[0]);
        console.log(results[0].geometry.viewport.b.b);
        this.node.address = results[0].formatted_address;
        this.node.lng = results[0].geometry.viewport.b.b
        this.node.lat = results[0].geometry.viewport.f.b
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

  addMarkerButton() {
    this.infoWindow.setContent(this.markerButton + this.deleteMarkerButton + this.node.address);

    if (this.isInfoWindowOpen(this.infoWindow)) {

    } else {
      this.infoWindow.open(this.map, this.markerApp);
    }




    google.maps.event.addListener(this.infoWindow, 'domready', () => {
      document.getElementById('deleteButton').addEventListener('click', () => {
        var button = document.getElementById('deleteButton');
        this.markerApp.setMap(null);


        this.disabled = false;
        console.log(this.disabled)
        this.addNodeClicked = false;




      });
    });





  }

  isInfoWindowOpen(infoWindow) {
    var map = this.infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");

  }

  loadCreateNodePage() {
    console.log()
    console.log(this.infoWindowObservable)
    if (this.infoWindowObservable.true === 2) {
      this.navCtrl.push("CreateNodePage", {
        param1: this.node.address,
        param2: this.node.lat,
        param3: this.node.lng

      });
      console.log("observe" + this.infoWindowObservable.true);
      this.infoWindowObservable.true = 0;
      console.log(this.infoWindowObservable)
      console.log("heheyey " + this.node.lat)
    }
  }


}