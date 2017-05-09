import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';


import { MapService } from '../../app/map.service';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  infoCard = null;
  @ViewChild('map') mapElement: ElementRef;
 
  constructor(public navCtrl: NavController,
              private mapService: MapService) {
    this.infoCard = mapService.infoCard;
  }
 
  ionViewDidLoad(){
    this.mapService.loadMap();
    this.mapService.mapElement = this.mapElement;
  }
}
