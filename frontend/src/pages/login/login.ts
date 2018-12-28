import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController } from 'ionic-angular';
import axios from 'axios'
import { FormsModule } from '@angular/forms';
import { User } from '../../providers/cat/cat';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "login",
  segment:"login"
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data = {
    email: '',
    password: ''
  }

  email: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private connect: Connect,
    private user: User
    // private toast: ToastCtrl,d
    // private modalCtrl: ModalCtrl,
    // private events: Events
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  // submit(){
  //   this.navCtrl.push('schedule');
  // }

  login() {
    axios.post('http://localhost:8080/login', this.data).then(({data}) => {
      this.user.set(data)
      this.navCtrl.push('schedule')
    })
  }

  // async submit() {
  //   if(!this.email) return this.toast.present('아이디를 입력해주세요.');

    // const obj = {
    //   email: this.form.email
    // }
    // const result = await this.connect.run('email', obj);
    // console.log(result);
    // switch(result.code) {
    //   case 0:
    //   this.user.set(result.data);
    //   // this.device.init = true;
    //   this.events.publish('login-change');
    //   this.navCtrl.setRoot('record-day');
    //   break;
    //   default:
    //   this.connect.error(result);
    //   break;
    // }
  // }
}
