import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController, Content } from 'ionic-angular';
import Swiper from 'swiper';
import { Utils } from '../../providers/cat/cat';

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
  
  @ViewChild('swiper') swiper;

  prev_3_date = {
    year: 0,
    month: 0,
    date: [],
    prev_date: []
  }
  prev_2_date = {
    year: 0,
    month: 0,
    date: [],
    prev_date: []
  }
  prev_date = {
    year: 0,
    month: 0,
    date: [],
    prev_date: []
  }
  active_date = {
    year: 0,
    month: 0,
    date: [],
    prev_date: []
  }
  next_date = {
    year: 0,
    month: 0,
    date: [],
    prev_date: []
  }
  next_2_date = {
    year: 0,
    month: 0,
    date: [],
    prev_date: []
  }
  next_3_date = {
    year: 0,
    month: 0,
    date: [],
    prev_date: []
  }

  r_index = 0;

  today = {
    year: 0,
    month: 0,
    date: 0
  }

  dates_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  constructor(
    public utils: Utils,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController
    ) {
    this.today = this.cutDate(this.utils.today());

    this.prev_3_date = this.calcMonth(this.cutDate(this.utils.today({month: -3})));
    this.prev_2_date = this.calcMonth(this.cutDate(this.utils.today({month: -2})));
    this.prev_date = this.calcMonth(this.cutDate(this.utils.today({month: -1})));
    this.active_date = this.calcMonth(this.cutDate(this.utils.today()));
    this.next_date = this.calcMonth(this.cutDate(this.utils.today({month: 1})));
    this.next_2_date = this.calcMonth(this.cutDate(this.utils.today({month: 2})));
    this.next_3_date = this.calcMonth(this.cutDate(this.utils.today({month: 3})));
  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.makeSlide();
    }, 200);
  }
  makeSlide() {
    let swiper = new Swiper(this.swiper.nativeElement, {
      direction: 'vertical',
      slidesPerView: 1,
      height: 320,
      initialSlide: 3,
      speed: 100
    });
    swiper.on('slidePrevTransitionEnd', () => {
      //console.log(swiper.previousIndex);
      //console.log(swiper.activeIndex);
      for(let i = 0; i < swiper.previousIndex - swiper.activeIndex; i++) {
        this.prev_3_date = this.calcMonth(this.prevMonth(this.prev_3_date));
        this.prev_2_date = this.calcMonth(this.prevMonth(this.prev_2_date));
        this.prev_date = this.calcMonth(this.prevMonth(this.prev_date));
        this.active_date = this.calcMonth(this.prevMonth(this.active_date));
        this.next_date = this.calcMonth(this.prevMonth(this.next_date));
        this.next_2_date = this.calcMonth(this.prevMonth(this.next_2_date));
        this.next_3_date = this.calcMonth(this.prevMonth(this.next_3_date));
      }
      swiper.slideTo(3, 0, false);
      //swiper.destroy();
      //this.makeSlide();
    });
    swiper.on('slideNextTransitionEnd', () => {
      //console.log(swiper.previousIndex);
      //console.log(swiper.activeIndex);
      for(let i = 0; i < swiper.activeIndex - swiper.previousIndex; i++) {
        this.prev_3_date = this.calcMonth(this.nextMonth(this.prev_3_date));
        this.prev_2_date = this.calcMonth(this.nextMonth(this.prev_2_date));
        this.prev_date = this.calcMonth(this.nextMonth(this.prev_date));
        this.active_date = this.calcMonth(this.nextMonth(this.active_date));
        this.next_date = this.calcMonth(this.nextMonth(this.next_date));
        this.next_2_date = this.calcMonth(this.nextMonth(this.next_2_date));
        this.next_3_date = this.calcMonth(this.nextMonth(this.next_3_date));
      }
      swiper.slideTo(3, 0, false);
      //swiper.destroy();
      //this.makeSlide();
    });
  }
  calcMonth(date_obj){
    //console.log(date_obj);
    let dates = 0;
    if(date_obj.month == 1){
      if(
        (date_obj.year%4 == 0 && date_obj.year%100 != 0) || date_obj.year%400 == 0
      ){
        dates = 29;
      }else{
        dates = 28;
      }
    } else {
      dates = this.dates_arr[date_obj.month];
    }
    const f = new Date(date_obj.year, date_obj.month, 1).getDay();

    return {
      year: date_obj.year,
      month: date_obj.month,
      date: Array(dates).fill(0).map((x,i) => i+1),
      prev_date: Array(f).fill(0)
    }
  }
  cutDate(str) {
    return {
      year: Number(str.substring(0, 4)),
      month: Number(str.substring(5, 7)) - 1,
      date: Number(str.substring(8, 10)) - 1
    }
  }
  mergeDate(obj) {
    return obj.year + '-' + this.utils.toXX(obj.month + 1) + '-' + this.utils.toXX(obj.date + 1);
  }
  prevMonth(date_obj){
    if(date_obj.month == 0) {
      date_obj.month = 11;
      date_obj.year --;
    }else {
      date_obj.month --;
    }
    return date_obj;
  }
  nextMonth(date_obj){
    if(date_obj.month == 11) {
      date_obj.month = 0;
      date_obj.year = date_obj.year +1;
    }else {
      date_obj.month = date_obj.month +1;
    }
    return date_obj;
  }
}