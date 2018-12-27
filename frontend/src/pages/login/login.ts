import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController } from 'ionic-angular';
// import { Connect, Device, User, ToastCtrl, ModalCtrl } from '../../providers/cat/cat';

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

  form = {
    email: ''
  }
  email: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private connect: Connect,
    // private device: Device,
    // private user: User,
    // private toast: ToastCtrl,
    // private modalCtrl: ModalCtrl,
    // private events: Events
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  submit(){
    this.navCtrl.push('schedule');
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
