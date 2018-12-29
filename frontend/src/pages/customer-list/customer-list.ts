import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "customer-list",
  segment : "customer-list"
})
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {
  datas = [
    { name: "송은지PD"},
    { name: "김태헌PD"},
    { name: "송시우PD"},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams ,public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
  }

}
