import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import axios from 'axios';
import moment from 'moment';

/**
 * Generated class for the CustomerNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'customer-note',
  segment: 'customer-note'
})
@Component({
  selector: 'page-customer-note',
  templateUrl: 'customer-note.html',
})
export class CustomerNotePage {
  list: Array<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerNotePage');
        // axios 사용한 통신 -----------------------
        axios.get('http://localhost:8080/note').then(({data}) => {
          data.sort((a,b) => a.createdAt > b.createdAt ? -1:1)
          data.map(item => item.createdAt = moment(data.createdAt).format('MM.DD'))
          this.list = data
        // console.log(data)
        })
  }
}
