import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { userData } from '../../dummy'

/**
 * Generated class for the PopupCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'popup-customer',
  segment:'popup-customer'
})
@Component({
  selector: 'page-popup-customer',
  templateUrl: 'popup-customer.html',
})
export class PopupCustomerPage {

  data = {}//타입스크립트 json 타입 선언 방법 모르겠음

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupCustomerPage');
  }

  goBack(){
    // this.navCtrl.pop()
    this.viewCtrl.dismiss()
  }
  save(){
    Object.assign(this.data, { id :userData.id })
    axios.put('http://localhost:8080/note', this.data).then(({data}) => this.navCtrl.pop())
  }
}
