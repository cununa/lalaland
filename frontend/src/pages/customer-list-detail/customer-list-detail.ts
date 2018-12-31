import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
import { ReservationProvider } from '../../providers/ReservationProvider';
import { ModalCtrl } from '../../providers/cat/cat';

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
  customerId: ''
  customerReservations = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController, 
    private modalCtrl: ModalCtrl,//모달 컨트롤러 아니고 모달 콘트롤쓴다 
    private reservationProvider: ReservationProvider) {
    const { name, phone, company, _id } = navParams.data
    this.name = name;
    this.phone = phone;
    this.company = company;
    this.customerId = _id;
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListDetailPage');
    const customerReservations = await this.reservationProvider.getCustomerReservations(this.customerId)
    this.customerReservations = customerReservations;
  }
  openModalModify(){
    let modal = this.modalCtrl.create('popup-customer', {}, { cssClass: 'long-modal'}).present();
  }

}
