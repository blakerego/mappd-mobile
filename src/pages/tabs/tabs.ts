import { Component } from '@angular/core';

import { MapsPage } from '../maps/maps';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MapService } from '../../app/map.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapsPage;
  tab3Root = ContactPage;

  constructor(private mapService: MapService) {

  }

  homeClicked() {
  	this.mapService.loadMap(false);
  }
}
