import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';

/**
 * Generated class for the CustomerHistotyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "customer-list-detail",
  segment : "customer-list-detail"
})
@Component({
  selector: 'page-customer-list-detail',
  templateUrl: 'customer-list-detail.html',
})
export class CustomerListDetailPage {
  name: ''
  phone: ''
  company: ''
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController) {
    const { name, phone, company } = navParams.data
    this.name = name;
    this.phone = phone;
    this.company = company;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListDetailPage');
  }

}
