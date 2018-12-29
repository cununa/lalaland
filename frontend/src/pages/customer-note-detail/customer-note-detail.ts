import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
import axios from 'axios';
import moment from 'moment';
import { ModalCtrl, User } from '../../providers/cat/cat';
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
  userName: ''
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
    public menuCtrl: MenuController,
    public user: User
  ) {
    this.userName = this.user.name;
    this.item = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerNoteDetailPage', this);
  }

  openModalModify(){
    let modal = this.modalCtrl.createWithCallBack(
      'popup-customer', {}, { cssClass: 'long-modal'}, this.modifyList.bind(this)).present();
  }

  openModalDel(){
    let modal = this.modalCtrl.createWithCallBack(
      'popup-customer', {}, { cssClass: 'long-modal'}, this.delList.bind(this)).present();
  }

  modifyList() {
    axios.post('https://lalaland-2019.appspot.com/note').then(({data}) => {
      data.sort((a,b) => a.createdAt > b.createdAt ? -1:1)
      data.map(item => item.createdAt = moment(data.createdAt).format('MM.DD'))
      this.list = data
      console.log(this.list)
    })
  }
  delList() {
    axios.delete('https://lalaland-2019.appspot.com/note').then(({data}) => {
      data.sort((a,b) => a.createdAt > b.createdAt ? -1:1)
      data.map(item => item.createdAt = moment(data.createdAt).format('MM.DD'))
      this.list = data
      console.log(this.list)
    })
  }
}
