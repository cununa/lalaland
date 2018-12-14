import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name :'schedule',
  segment:'schedule'
})
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  year = 2018;
  month = 8;
  dates = 31;
  dates_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  first_day = 0;

  empty_arr = [];
  date_arr = [];



// 31 28,29 31 30 31 30 31 31 30 31 30 31
//1. 이달의 갯수를 구한다
//2. 이달의 1일이 무슨요일인지 구한다.

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController) {
    this.calcMonth();

//    console.log(new Date(this.year, this.month, 1).getDay());
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  prevMonth(){
    if(this.month == 0) {
      this.month = 11;
      this.year --;
    }else {
      this.month --;
 //     this.month = this.month -1;
    }
    this.calcMonth();
  }
  nextMonth(){
    if(this.month == 11) {
      this.month = 0;
      this.year = this.year +1;
    }else {
      this.month = this.month +1;
    }
    this.calcMonth();
  }
  calcMonth(){
    if(this.month == 1){
      if(
        (this.year%4 == 0 && this.year%100 != 0) || this.year%400 == 0
      ){
        this.dates = 29;
      }else{
        this.dates = 28;
      }
    }else{
      this.dates = this.dates_arr[this.month];
    }
    this.first_day = new Date(this.year, this.month, 1).getDay();

    this.empty_arr = Array(this.first_day).fill(0);//first_day에서 나온 숫자 만큼 엠테를 채워라
    this.date_arr = Array(this.dates).fill(0);
  }
}
