import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Events
} from 'ionic-angular';
 import { Connect, Device, User, ToastCtrl, ModalCtrl } from '../../providers/cat/cat';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "login",
  segment: "login"
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form = {
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
     private connect: Connect,
     private device: Device,
     private user: User,
     private toast: ToastCtrl,
     private modalCtrl: ModalCtrl,
     private events: Events
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  async submit() {
    if (!this.form.email) return this.toast.present('아이디를 입력해주세요.');
    if (!this.form.password) return this.toast.present('비밀번호를 입력해주세요.');

    const obj = {
      email: this.form.email,
      password: this.form.password,
    }
    const result = await this.connect.run({route: 'login', method: 'post'}, obj);

    switch(result.message) {
      case 'error':
        this.toast.present('찾을 수 없는 유저입니다.');
        break;
      case '아이디 또는 비밀번호를 확인하세요.':
        this.toast.present('아이디 또는 비밀번호를 확인하세요.');
        break;
      default:
        this.user.set(result);
        this.events.publish("user:loggedIn")
        this.navCtrl.setRoot('schedule', {}, {
          animate: true
        });
      break;
    }
  }
}