import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';

/**
 * Generated class for the RentalRatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rental-rate',
  templateUrl: 'rental-rate.html',
})
export class RentalRatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams ,public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalRatePage');
  }

}
