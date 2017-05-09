import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MapService } from '../../app/map.service';
import { ServerService } from '../../app/server.service';


@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {
  maps = [];
  constructor(public nav: NavController,
  						private http: Http,
  						public mapService: MapService,
              private serverService: ServerService) {

    let endpoint = '/maps.json';
    this.http.get(serverService.rootUrl + endpoint)
      .map(response => response.json())
      .subscribe(data => {
				this.maps = data;
      });
  }

  public mapClicked(map) {
  	this.mapService.updateMap(map);
    this.nav.parent.select(0);
  }
}
