import { CustomerProvider } from './../../providers/CustomerProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController, Events } from 'ionic-angular';
import { AlertCtrl } from '../../providers/cat/cat';

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
  customers = [];

  event_customer = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams ,
    public menuCtrl: MenuController, 
    private alertCtrl: AlertCtrl,
    public customerProvider: CustomerProvider,
    private events: Events
    ) {
  }

  async ionViewDidLoad() {
    this.event_customer = this.refresh.bind(this);
    this.events.subscribe('customer:refresh', this.event_customer);
    this.refresh();
  }
  ionViewWillUnload(){
    this.events.unsubscribe('customer:refresh', this.event_customer);
  }
  async refresh() {
    await this.customerProvider.getCustomers();
    this.customers = this.customerProvider.customers;
  }
}
