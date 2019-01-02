import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { userData } from '../../dummy'
import { Connect,ToastCtrl } from '../../providers/cat/cat';
import { INote } from '../customer-note/customer-note';

/**
 * Generated class for the PopupCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface INewNote {
  title: string,
  content: string
}

@IonicPage({
  name:'popup-customer',
  segment:'popup-customer'
})
@Component({
  selector: 'page-popup-customer',
  templateUrl: 'popup-customer.html',
})
export class PopupCustomerPage {

  data = {
    _id: '',
    name: '',
    phone: '',
    company: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private connect: Connect,
    private toast: ToastCtrl,
    private events: Events
  ) {

  }

  ionViewDidLoad() {
    this.data = this.navParams.data;
  }

  goBack(){
    this.viewCtrl.dismiss()
  }

  async save(){
    const result = await this.connect.run({ route: 'customer', method: 'post'}, this.data);
    this.events.publish('customer:refresh');
    this.viewCtrl.dismiss();
  }
}
