import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServerService } from './server.service';
import { NgZone } from '@angular/core';

declare var google;

@Injectable()
export class MapService {

  constructor(private http: Http, private serverService: ServerService, private ngZone: NgZone) { }

  selectedMap = {
    id: 1
  };
  mapElement = null;
  bounds  = null;
  markers = [];
  map: any;
  infoCard = {
    show: false,
    mapLocation: null
  };
 
  public loadMap() {

    let endpoint = '/locations/bymapid?map_id=' + this.selectedMap.id;
    this.http.get(this.serverService.rootUrl + endpoint)
      .map(response => response.json())
      .subscribe(data => {
        this.bounds = new google.maps.LatLngBounds();
        let mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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
      $this.ngZone.run(() => {
        $this.infoCard.mapLocation = mapLocation;
        $this.infoCard.show = true;
      });
    })
  }
}