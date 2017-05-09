import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var google;

@Injectable()
export class MapService {

  constructor(private http: Http) { }

  selectedMap = {
    id: 1
  };
  mapElement = null;
  bounds  = null;
  markers = [];
  map: any;
  infoWindow = null;
  needsRefresh = true;
 
  public loadMap(force) {
    if (!this.needsRefresh || force) {
      return;
    }
    let server = 'http://localhost:3000';
    let endpoint = '/locations/bymapid?map_id=' + this.selectedMap.id;
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
    this.needsRefresh = false;
  }

  public updateMap(map) {
    if (this.selectedMap.id === map.id) {
      return;
    } else {
      this.selectedMap = map;
      this.needsRefresh = true;
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
      $this.infoWindow.setContent('<div>' + mapLocation.name + '</div>');
      $this.infoWindow.open($this.map, marker);
    })

  }

}