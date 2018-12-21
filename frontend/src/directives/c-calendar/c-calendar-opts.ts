import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../providers/cat/cat';

@IonicPage({
  name: 'c-calendar-opts',
  segment: 'c-calendar-opts'
})
@Component({
  selector: 'page-c-calendar-opts',
  templateUrl: 'c-calendar-opts.html',
})
export class CCalendarOptsPage {

  @ViewChildren('cols') cols;

  opts:any[];
  year = 2018;
  month = 8; // 2라고 쓰면 3월
  dates = 31;
  dates_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  first_day = 0;

  empty_arr = [];
  date_arr = [];

  actvie_start_num:number = 0;
  prev_active_dates = [];
  active_dates = {
    year: null,
    month: null,
    date: null
  };
  active_mode:string = 'INSERT';

  min = '';
  max = '';

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public utils: Utils,
  ) {
    //console.log(this.navParams.data);
    if(this.navParams.data.selected) {
      this.active_dates = this.cutDate(this.navParams.data.selected);
      this.year = this.active_dates.year;
      this.month = this.active_dates.month;
    } else {
      let today = this.cutDate(this.utils.today());
      this.year = today.year;
      this.month = today.month;
    }
    this.min = this.navParams.data.min;
    this.max = this.navParams.data.max;
    this.calcMonth();
  }
  ionViewDidLoad(){
    this.opts = this.navParams.data.options;
  }
  cantSelect(date) {
    let thisDate = this.year + '-' + this.utils.toXX(this.month+1) + '-' + this.utils.toXX(date+1);
    return (this.utils.dateCompare(this.max, thisDate) && this.max)
    || (this.utils.dateCompare(thisDate, this.min) && this.min);
  }
  selectOpt(item) {
    this.viewCtrl.dismiss(item);
  }
  prevMonth() {
    if(this.month == 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    this.calcMonth();
  }
  nextMonth() {
    if(this.month == 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.calcMonth();
  }
  calcMonth() {
    if(this.month == 1) {
      if(
        (this.year%4 == 0 && this.year%100 != 0) || this.year%400 == 0
      ) {
        this.dates = 29;
      } else {
        this.dates = 28;
      }
    } else {
      this.dates = this.dates_arr[this.month];
    }
    this.first_day = new Date(this.year, this.month, 1).getDay();
    
    this.empty_arr = Array(this.first_day).fill(0);
    this.date_arr = Array(this.dates).fill(0).map((x, i) => i);
  }
  toggleDate(date) {
    this.active_dates.year = this.year;
    this.active_dates.month = this.month;
    this.active_dates.date = date;
    setTimeout(() => {
      this.viewCtrl.dismiss(this.mergeDate(this.active_dates));
    }, 100);
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
  arr_minus (a1, a2) {
    let a1c = JSON.parse(JSON.stringify(a1));
    let a = [];
    for(let i = 0; i < a1.length; i++) {
      for(let j = 0; j < a2.length; j++) {
        if(a1[i] == a2[j]) {
          delete a1c[i];
        }
      }
    }
    for(let i = 0; i < a1c.length; i++) {
      if(a1c[i] != undefined) {
        a.push(a1c[i]);
      }
    }
    return a;
  }
}