import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import axios from 'axios';
import moment from 'moment';
import { ModalCtrl } from '../../providers/cat/cat';

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
    private modalCtrl: ModalCtrl,//모달 컨트롤러 아니고 모달 콘트롤쓴다 
    public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerNotePage');
    this.getList()
  }
  
  openModalWrite(){
    let modal = this.modalCtrl.createWithCallBack(
      'popup-customer', {}, { cssClass: 'long-modal'}, this.getList.bind(this)).present();
  }

  getList() {
    axios.get('https://lalaland-2019.appspot.com/note').then(({data}) => {
      console.log(data);
      data.sort((a,b) => a.createdAt > b.createdAt ? -1:1)
      data.map(item => item.createdAt = moment(data.createdAt).format('MM.DD'))
      this.list = data
      console.log(this.list)
    })
  }

}