import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Http } from '@angular/http';

import { MapService } from '../../app/map.service';
import { ServerService } from '../../app/server.service';
import { ViewController } from 'ionic-angular';
 
@Component({
  selector: 'new-map',
  templateUrl: 'new-map.html'
})
export class NewMapPage {

  firstLocation = {
    id: null,
    name: null
  };
  map = {
    name: '',
    location_ids: []
  };
  locations = [];
  @ViewChild(Slides) slides: Slides;
  constructor(private mapService: MapService,
              private serverService: ServerService,
              private http: Http,
              private viewCtrl: ViewController) {
  }

  goToNextSlide() {
    if (this.map.name != '') {
      this.slides.slideTo(this.slides.getActiveIndex() + 1, 500);
    }
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex == 1 && this.map.name === '') {
      this.slides.slideTo(0, 200);
    }
  }
 
  getItems(event) {
    let endpoint = '/locations.json?query=' + event.target.value;
    this.http.get(this.serverService.rootUrl + endpoint)
      .map(response => response.json())
      .subscribe(data => {
        this.locations = data;
      });
  }

  createMap() {
    this.map.location_ids.push(this.firstLocation.id);
    let createEndpoint = '/maps.json';
    this.http.post(this.serverService.rootUrl + createEndpoint, { map: this.map })
      .map(response => response.json())
      .subscribe(data => {
        this.viewCtrl.dismiss(data);
      });
  }

  locationSelected(location) {
    this.firstLocation = location;
  }
}
