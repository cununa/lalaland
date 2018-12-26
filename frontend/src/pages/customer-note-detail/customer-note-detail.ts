import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
import axios from 'axios';
import moment from 'moment';
import { ModalCtrl } from '../../providers/cat/cat';
/**
 * Generated class for the CustomerNoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "customer-note-detail",
  segment : "customer-note-detail"
})
@Component({
  selector: 'page-customer-note-detail',
  templateUrl: 'customer-note-detail.html',
})
export class CustomerNoteDetailPage {
  list: Array<string>;

  item ={
    createdAt:'',
    name:'',
    title:'',
    content:''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalCtrl,//모달 컨트롤러 아니고 모달 콘트롤쓴다
    public menuCtrl: MenuController) {
      this.item =this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerNoteDetailPage');
  }

  // openModalModify(){
  //   let modal = this.modalCtrl.createWithCallBack(
  //     'popup-customer', {}, { cssClass: 'long-modal'}, this.modifyList.bind(this)).present();
  // }

  // openModalDel(){
  //   let modal = this.modalCtrl.createWithCallBack(
  //     'popup-customer', {}, { cssClass: 'long-modal'}, this.delList.bind(this)).present();
  // }

  // modifyList() {
  //   axios.post('http://localhost:8080/note').then(({data}) => {
  //     data.sort((a,b) => a.createdAt > b.createdAt ? -1:1)
  //     data.map(item => item.createdAt = moment(data.createdAt).format('MM.DD'))
  //     this.list = data
  //     console.log(this.list)
  //   })
  // }
  // delList() {
  //   axios.delete('http://localhost:8080/note').then(({data}) => {
  //     data.sort((a,b) => a.createdAt > b.createdAt ? -1:1)
  //     data.map(item => item.createdAt = moment(data.createdAt).format('MM.DD'))
  //     this.list = data
  //     console.log(this.list)
  //   })
  // }
}
