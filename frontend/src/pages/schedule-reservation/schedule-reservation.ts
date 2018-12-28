import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController  } from 'ionic-angular';
import { Utils, AlertCtrl } from '../../providers/cat/cat';

/**
 * Generated class for the ScheduleReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "schedule-reservation",
  segment : "schedule-reservation"
})
@Component({
  selector: 'page-schedule-reservation',
  templateUrl: 'schedule-reservation.html',
})
export class ScheduleReservationPage {
  form = {
    name: '',
    email: '',
    space: '',
    phone:'',
    start: {
      date: '2018-12-29',
      time: '13:12'
    },
    end: {
      date: '2018-12-29',
      time: '13:12'
    },
    lastend: {
      date: '2018-12-29',
      time: '13:12'
    }
  }

  is_reservation: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private alertCtrl: AlertCtrl,
    public utils: Utils
    ) {
      const today = new Date();
      console.log(this.navParams.data);
      if(this.navParams.data.active_date) {
        this.form.start.date = this.navParams.data.active_date.year + '-' + this.utils.toXX(this.navParams.data.active_date.month + 1) + '-' + this.utils.toXX(this.navParams.data.date);
        this.form.start.time = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.end.date = this.navParams.data.active_date.year + '-' + this.utils.toXX(this.navParams.data.active_date.month + 1) + '-' + this.utils.toXX(this.navParams.data.date);
        this.form.end.time = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.lastend.date = this.navParams.data.active_date.year + '-' + this.utils.toXX(this.navParams.data.active_date.month + 1) + '-' + this.utils.toXX(this.navParams.data.date);
        this.form.lastend.time = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
      } else {
        this.form.start.date = today.getFullYear() + '-' + this.utils.toXX(today.getMonth() + 1) + '-' + this.utils.toXX(today.getDate());
        this.form.start.time = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.end.date = today.getFullYear() + '-' + this.utils.toXX(today.getMonth() + 1) + '-' + this.utils.toXX(today.getDate());
        this.form.end.time = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.lastend.date = today.getFullYear() + '-' + this.utils.toXX(today.getMonth() + 1) + '-' + this.utils.toXX(today.getDate());
        this.form.lastend.time = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleReservationPage');
   
  }
  ionViewCanLeave() {
    // if (this.is_reservation) {
    //   return new Promise((resolve, reject) => {
    //     let confirm:any = this.alertCtrl.create({
    //       message: '저장하겠습니까?',
    //       buttons: [{
    //           text: '아니오',
    //           handler: () => {
    //             reject();
    //           }
    //         },
    //         {
    //           text: '예',
    //           handler: () => {
    //             resolve();
    //           }
    //         }
    //       ]
    //     });
    //     confirm.present();
    //   });
    // }
  }

  send(){
    let confirm:any = this.alertCtrl.create({
      message: '저장하겠습니까?',
      buttons: [{
          text: '예',
          handler: () => {
            this.navCtrl.setRoot('schedule', {}, {animate: true});
          }
        },
        {
          text: '아니요',
          role: 'cancel'
        }
      ]
    });
    confirm.present();
  }
}
