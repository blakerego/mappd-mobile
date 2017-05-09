import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServerService } from './server.service';

declare var google;

@Injectable()
export class MapService {

  constructor(private http: Http, private serverService: ServerService) { }

  selectedMap = {
    id: 1
  };
  mapElement = null;
  bounds  = null;
  markers = [];
  map: any;
  infoWindow = null;
 
  public loadMap() {

    let endpoint = '/locations/bymapid?map_id=' + this.selectedMap.id;
    this.http.get(this.serverService.rootUrl + endpoint)
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

  public updateMap(map) {
    if (this.selectedMap.id === map.id) {
      return;
    } else {
      this.selectedMap = map;
      this.loadMap()
    }
  }

  /// Private Methods Below 
  private setupMarker(mapLocation) {
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
      $this.infoWindow.setContent('<ion-card><ion-card-header>' +
        mapLocation.name +
        '</ion-card-header><ion-card-content></ion-card-content></ion-card>');
      $this.infoWindow.open($this.map, marker);
    })

  }

}