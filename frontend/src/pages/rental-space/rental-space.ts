import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';

/**
 * Generated class for the RentalSpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rental-space',
  templateUrl: 'rental-space.html',
})
export class RentalSpacePage {

  constructor(public navCtrl: NavController, public navParams: NavParams ,public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalSpacePage');
  }

}
