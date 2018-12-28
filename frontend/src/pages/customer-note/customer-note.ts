import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import axios from 'axios';
import moment from 'moment';
import { ModalCtrl, User } from '../../providers/cat/cat'; // 인증(로그인) 처리를 위해선 User를 넣어주어야 함

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
    public menuCtrl: MenuController,
    public user: User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerNotePage');
    // 로그인 되어있는지 여부를 판단하고 되어있지 않으면 login 페이지로 보냄
    if (!this.user.get().accessToken) {
      this.navCtrl.push('login')
    } else {
      this.getList()
    }
    // ----------------------------------------------------------------
  }
  
  openModalWrite(){
    let modal = this.modalCtrl.createWithCallBack(
      'popup-customer', {}, { cssClass: 'long-modal'}, this.getList.bind(this)).present();
  }

  getList() {
    // 모든 데이터 통신할때 headers 부분을 삽입해야 함. 시간 관계상 래핑 함수는 작성하지 않음.
    axios.get('https://lalaland-2019.appspot.com/note',
    { headers: { accessToken: this.user.get().accessToken } }).then(({data}) => {
      data.sort((a,b) => a.createdAt > b.createdAt ? -1:1)
      data.map(item => item.createdAt = moment(data.createdAt).format('MM.DD'))
      this.list = data
    })
    // ---------------------------------------------------------------------------------
  }

}