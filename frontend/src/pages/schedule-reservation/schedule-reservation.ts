import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController  } from 'ionic-angular';
import { Utils } from '../../providers/cat/cat';

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
    phone:''
  }

  is_reservation: boolean = false;
  
  myDate = '2018-12-29';
  myTime = '13:12';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController,
    public utils: Utils
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleReservationPage');
   
  }
  test(ev) {
    console.log(this.myTime);
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
            const obj = {
                email: this.form.email
               }
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
