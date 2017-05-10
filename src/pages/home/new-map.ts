import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { MapService } from '../../app/map.service';
import { Slides } from 'ionic-angular';
 
@Component({
  selector: 'new-map',
  templateUrl: 'new-map.html'
})
export class NewMapPage {
  map = {
    name: ''
  };
  firstLocation;
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController,
              private mapService: MapService) {
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
 
  createMap() {
    alert(this.map.name);
  }
}
