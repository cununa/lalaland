import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController, Events } from 'ionic-angular';
import { ToastCtrl, Connect, User} from '../../providers/cat/cat';
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "admin",
  segment : "admin"
})
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  form = {
    name: '',
    phone: '',
    email: '',
    password: '',
    doubleCheckPassword: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController, private toast: ToastCtrl, private user: User, private connect: Connect, private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  async submit() {
    if (!this.form.name) return this.toast.present('이름을 입력해주세요.');
    if (!this.form.phone) return this.toast.present('핸드폰 번호를 입력해주세요.');
    if (!this.form.email) return this.toast.present('이메일을 입력해주세요.');
    if (!this.form.password) return this.toast.present('비밀번호를 입력해주세요.');
    if (!this.form.doubleCheckPassword) return this.toast.present('재확인 비밀번호를 입력해주세요.');
    if (this.form.password !== this.form.doubleCheckPassword) return this.toast.present('재확인 비밀번호를 정확히 입력해주세요.');

    const obj = {
      name: this.form.name,
      email: this.form.email,
      password: this.form.password,
      phone: this.form.phone,
    }

    const result = await this.connect.run({route: 'join', method: 'post'}, obj);

    switch(result.message) {
      case 'user email exsists':
        this.toast.present('이미 사용중인 이메일 입니다.');
        this.form.email = '';
        break;
      default:
        this.user.set(result);
        this.events.publish("user:loggedIn");
        this.navCtrl.setRoot('schedule', {}, {
          animate: true
        });
        break;
    }
  }

}
