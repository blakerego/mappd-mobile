import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { NewMapPage } from './new-map';
import { ModalController } from 'ionic-angular';
import { MapService } from '../../app/map.service';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  infoCard = null;
  @ViewChild('map') mapElement: ElementRef;
 
  constructor(public navCtrl: NavController,
              private mapService: MapService,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController) {
    this.infoCard = mapService.infoCard;
  }
 
  ionViewDidLoad(){
    this.mapService.loadMap();
    this.mapService.mapElement = this.mapElement;
  }

  addToMap() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '+ Add',
      buttons: [
        {
          text: 'Add spot to map',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Create new map',
          handler: () => {
            let newMapModal = this.modalCtrl.create(NewMapPage);
            newMapModal.onDidDismiss(data => {
              this.mapService.updateMap(data);
              this.navCtrl.parent.select(0);
            });
            newMapModal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
