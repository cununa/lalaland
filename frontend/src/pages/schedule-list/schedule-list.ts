import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  ReservationProvider,
  IReservation
} from '../../providers/ReservationProvider';
import {
  Utils, ModalCtrl
} from '../../providers/cat/cat';

@IonicPage({
  name: 'schedule-list',
  segment: 'schedule-list'
})
@Component({
  selector: 'page-schedule-list',
  templateUrl: 'schedule-list.html',
})
export class ScheduleListPage {

  reservations: IReservation[] = [];
  ym = {
    year: 0,
    month: 0
  };
  d = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reservationProvider: ReservationProvider,
    private utils: Utils,
    private modalCtrl: ModalCtrl
  ) {
    this.ym = this.navParams.data.active_date;
    this.d = this.navParams.data.date;

  }

  ionViewDidLoad() {
    this.getList();
  }
  async getList() {
    await this.reservationProvider.getReservations();
    this.reservations = this.reservationProvider.reservations;
  }
  activeDate(reservation) {
    let date = this.utils.mergeDate({
      year: this.ym.year,
      month: this.ym.month,
      date: this.d
    });
    if (reservation.startDate == date) {
      return true;
    } else {
      return false;
    }
  }
  addPlan(space) {
    this.modalCtrl.create('schedule-reservation', {
      space: space,
      date: this.d,//클릭한 날짜
      active_date: this.ym//클릭한 월
    }).present();
  }
  openDetail(reservation) {
    this.navCtrl.push('schedule-detail', reservation);
  }
}