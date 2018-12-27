import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
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
  
  myDate = '2018-12-29';
  myTime = '13:12';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public utils: Utils
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleReservationPage');
   
  }
  test(ev) {
    console.log(this.myTime);
  }

}
