import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {
  maps = [];
  constructor(public navCtrl: NavController, private http: Http) {
    let server = 'http://localhost:3000';
    let endpoint = '/maps.json';
    this.http.get(server + endpoint)
      .map(response => response.json())
      .subscribe(data => {
				this.maps = data;
      });
  }

}
