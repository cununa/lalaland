import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ViewController, IonicApp  } from 'ionic-angular';
import { ReservationProvider } from '../../providers/ReservationProvider';
import { ModalCtrl, Connect, AlertCtrl } from '../../providers/cat/cat';

/**
 * Generated class for the CustomerHistotyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "customer-list-detail",
  segment : "customer-list-detail/:name/:phone/:company/:_id"
})
@Component({
  selector: 'page-customer-list-detail',
  templateUrl: 'customer-list-detail.html',
})
export class CustomerListDetailPage {
  name: ''
  phone: ''
  company: ''
  customerId: '';
  customerReservations = [];

  event_customer = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController, 
    private modalCtrl: ModalCtrl,//모달 컨트롤러 아니고 모달 콘트롤쓴다 
    private reservationProvider: ReservationProvider,
    private connect: Connect,
    private events: Events,
    private alertCtrl: AlertCtrl,
    private viewCtrl: ViewController,
    private ionicApp: IonicApp,
    ) {
    const { name, phone, company, _id } = navParams.data;
    this.name = name;
    this.phone = phone;
    this.company = company;
    this.customerId = _id;
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
    //console.log('refresh');
    const customerReservations = await this.reservationProvider.getCustomerReservations(this.customerId);
    //console.log(customerReservations);
    this.name = customerReservations.customer.name;
    this.phone = customerReservations.customer.phone;
    this.company = customerReservations.customer.company;
    this.customerId = customerReservations.customer._id;
    this.customerReservations = customerReservations.reservations;
  }
  openModalModify(){
    let modal = this.modalCtrl.create('popup-customer', {
      _id: this.customerId,
      name: this.name,
      phone: this.phone,
      company: this.company
    }, { cssClass: 'long-modal'}).present();
  }
  async removeCustomer() {
    this.alertCtrl.create({
      subTitle: '고객 삭제',
      messagee: '고객을 삭제하시겠습니까?',
      buttons: [{
        text: '취소'
      }, {
        text: '삭제',
        handler: async() => {
          console.log('remove');
          const result = await this.connect.run({ route: `customer/${this.customerId}`, method: 'delete'});
          this.navCtrl.pop();
          this.events.publish('customer:refresh');
        }
      }]
    }).present();
  }
}