import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  data: INewNote = { title: '', content: ''}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private connect: Connect,
    private toast: ToastCtrl
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupCustomerPage');
  }

  goBack(){
    this.viewCtrl.dismiss()
  }
  
  async save(){
    const result = await this.connect.run({ route: 'note', method: 'put'}, this.data)

    if (result.code && result.message) {
      this.navCtrl.pop();
      this.toast.present(`에러: ${result.code}. 노트 생성중 문제가 발생했습니다. 스크린샷으로 문의해주세요.`);
    } else {
      const { _id, title, content, createdAt } = result
      this.viewCtrl.dismiss({ _id, title, content, createdAt})
    }
  }
}
