import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ScheduleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : 'schedule-list',
  segment: 'schedule-list'
})
@Component({
  selector: 'page-schedule-list',
  templateUrl: 'schedule-list.html',
})
export class ScheduleListPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams , public menuCtrl: MenuController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleListPage');
  }

}
