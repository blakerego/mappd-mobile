import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  bounds  = null;
  markers = [];
  map: any;
  infoWindow = null;
  $this;
 
  @ViewChild('map') mapElement: ElementRef;
 
  constructor(public navCtrl: NavController,
              private http: Http) {
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }

  setupMarker(mapLocation) {
    /// Expand bounds for each map location.
    let latLong = new google.maps.LatLng(mapLocation.latitude, mapLocation.longitude);
    this.bounds.extend(latLong);

    /// Create marker for each map location
    var marker = new google.maps.Marker({
        position: latLong,
        map: this.map,
        title: mapLocation.name
      });

    this.markers.push(marker);
    var $this = this;
    marker.addListener('click', function () {
      $this.infoWindow.close();
      $this.infoWindow.setContent('<div>' + mapLocation.name + '</div>');
      $this.infoWindow.open($this.map, marker);
    })

  }
 
  loadMap() {
    let server = 'http://localhost:3000';
    let endpoint = '/locations/bymapid?map_id=1';
    this.http.get(server + endpoint)
      .map(response => response.json())
      .subscribe(data => {
        this.bounds = new google.maps.LatLngBounds();
        let mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.infoWindow = new google.maps.InfoWindow();
        for (var mapLocation of data) {
          this.setupMarker(mapLocation);
        }
        this.map.fitBounds(this.bounds);
      });
  }
}
