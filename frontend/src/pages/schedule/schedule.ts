import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController, Content, AlertController, ActionSheetController, Events } from 'ionic-angular';
import Swiper from 'swiper';
import { Utils, Connect, ModalCtrl } from '../../providers/cat/cat';
import { ReservationProvider } from '../../providers/ReservationProvider';

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
  
  is_loaded:boolean = false;

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

  today = {
    year: 0,
    month: 0,
    date: 0
  }

  dates_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  reserve_list = [];

  event_refresh = null;

  constructor(
    public utils: Utils,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public menuCtrl: MenuController,
    private connect: Connect,
    private reservation: ReservationProvider,
    private modalCtrl: ModalCtrl,
    private events: Events
    ) {
    this.today = this.cutDate(this.utils.today());

    this.prev_3_date = this.calcMonth(this.cutDate(this.utils.today({month: -3}, true)));
    this.prev_2_date = this.calcMonth(this.cutDate(this.utils.today({month: -2}, true)));
    this.prev_date = this.calcMonth(this.cutDate(this.utils.today({month: -1}, true)));
    this.active_date = this.calcMonth(this.cutDate(this.utils.today()));
    this.next_date = this.calcMonth(this.cutDate(this.utils.today({month: 1}, true)));
    this.next_2_date = this.calcMonth(this.cutDate(this.utils.today({month: 2}, true)));
    this.next_3_date = this.calcMonth(this.cutDate(this.utils.today({month: 3}, true)));
  }
  ionViewDidLoad() {
    this.event_refresh = this.refresh.bind(this);
    this.events.subscribe('schedule:refresh', this.event_refresh);
    this.refresh();
  }
  ionViewWillUnload(){
    this.events.unsubscribe('schedule:refresh', this.event_refresh);
  }
  async refresh() {
    this.is_loaded = false;
    await this.reservation.getReservations();
    let r_arr = [];
    //리스트가 있으면 회색 점
    //finalPayment 가 있으면 빨강 점
    this.reservation.reservations.map((x:any) => x.startDateObj = this.utils.cutDate(x.startDate));
    this.reserve_list = this.reservation.reservations;
    console.log(this.reserve_list);
    this.is_loaded = true;
    setTimeout(() => {
      this.makeSlide();
    }, 0);
  }
  activeDate(ym, d) {
    let arr = [];
    for(let i = 0; i < this.reserve_list.length; i++) {
      if((ym.year == this.reserve_list[i].startDateObj.year && ym.month == this.reserve_list[i].startDateObj.month && d == this.reserve_list[i].startDateObj.date)
        && !this.reserve_list[i].isRemovedReservation) {
        if(this.reserve_list[i].finalPayment) {
          arr.push('red');
        } else  {
          arr.push('gray');
        }
      }
    }
    return arr;
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
      date: Number(str.substring(8, 10))
    }
  }
  mergeDate(obj) {
    return obj.year + '-' + this.utils.toXX(obj.month + 1) + '-' + this.utils.toXX(obj.date);
  }
  prevMonth(date_obj) {
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
 
  openDetail(date, active_date) {
    this.navCtrl.push('schedule-reservation', {
      date: date,//클릭한 날짜
      active_date: active_date//클릭한 월
    });
  }
//바로 예약페이지를 거치지 않고 하단에 엑션 시트를 고쳐야 해서 수정했는데
//수정을 잘 한건지 모르겠습니다 ㅜㅜ
  presentActionSheet(date, active_date) {
    this.modalCtrl.create('schedule-list', {
      date: date,
      active_date: active_date
    }, {
      cssClass: 'type-action-sheet'
    }).present();
    /* let actionSheet = this.actionSheetCtrl.create({
      title: '예약 가능한 스튜디오',
      buttons: [{
          text: 'LaLaLand Studio',
          role: 'LaLaLand Studio',
          handler: () => {
            this.navCtrl.push('schedule-reservation', {
              space: "ls",
              date: date,//클릭한 날짜
              active_date: active_date//클릭한 월
            });
          }
        },
        {
          text: 'LaLaLand Looftop',
          role: 'LaLaLand Looftop',
          handler: () => {
            this.navCtrl.push('schedule-reservation', {
              space: "llt",
              date: date,//클릭한 날짜
              active_date: active_date//클릭한 월
            });
          }
        },
        {
          text: 'Shackespeare Vacation',
          role: 'Shackespeare Vacation',
          handler: () => {
            this.navCtrl.push('schedule-reservation', {
              space: "sv",
              date: date,//클릭한 날짜
              active_date: active_date//클릭한 월
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present(); */
  }
}