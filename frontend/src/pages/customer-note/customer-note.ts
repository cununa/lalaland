import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import axios from 'axios';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CustomerNotePage');
    //     // axios 사용한 통신 -----------------------
    //     axios.put('http://localhost:8080/note', {
    //       title: 'note@nddlk.com',
    //       name: 'dddd',
    //       content: 'dsf',
    //     }).then(({data}) => {
    //       console.log(data)
    //     })
  }

}
