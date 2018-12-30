import { CustomerProvider } from './../../providers/CustomerProvider';
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
  customers = []
  constructor(public navCtrl: NavController, public navParams: NavParams ,public menuCtrl: MenuController, public customerProvider: CustomerProvider) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
    await this.customerProvider.getCustomers();
    this.customers = this.customerProvider.customers;
  }

}
