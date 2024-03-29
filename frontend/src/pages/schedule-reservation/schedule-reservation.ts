import {
  Connect
} from './../../providers/cat/cat';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  IonicApp,
  Events
} from 'ionic-angular';
import {
  Utils,
  AlertCtrl
} from '../../providers/cat/cat';
import {
  ReservationProvider
} from '../../providers/ReservationProvider';

/**
 * Generated class for the ScheduleReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "schedule-reservation",
  segment: "schedule-reservation"
})
@Component({
  selector: 'page-schedule-reservation',
  templateUrl: 'schedule-reservation.html',
})
export class ScheduleReservationPage {
  form = {
    title: '',
    content: '',
    reservationHolderName: '',
    reservationHolderPhone: '',
    isCustomerInfoSameAsReservationHolder: false,
    space: '',
    company: '',
    customerName: '',
    customerPhone: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    withdrawDate: '',
    withdrawTime: '',
    isRemovedReservation: false,
    intermediatePayment: false,
    downPayment: false,
    finalPayment: false
  }

  is_reservation: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private alertCtrl: AlertCtrl,
    public utils: Utils,
    private connect: Connect,
    // private toast: Toast,
    public reservationProvider: ReservationProvider,
    private ionicApp: IonicApp,
    private events: Events
  ) {
    if (this.navParams.data.reservation) {
      this.is_reservation = true;
      this.form = this.navParams.data.reservation;
    } else {
      const today = new Date();
      this.form.space = this.navParams.data.space;
      if (this.navParams.data.active_date) {
        this.form.startDate = this.navParams.data.active_date.year + '-' + this.utils.toXX(this.navParams.data.active_date.month + 1) + '-' + this.utils.toXX(this.navParams.data.date);
        this.form.startTime = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.endDate = this.navParams.data.active_date.year + '-' + this.utils.toXX(this.navParams.data.active_date.month + 1) + '-' + this.utils.toXX(this.navParams.data.date);
        this.form.endTime = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.withdrawDate = this.navParams.data.active_date.year + '-' + this.utils.toXX(this.navParams.data.active_date.month + 1) + '-' + this.utils.toXX(this.navParams.data.date);
        this.form.withdrawTime = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
      } else {
        this.form.startDate = today.getFullYear() + '-' + this.utils.toXX(today.getMonth() + 1) + '-' + this.utils.toXX(today.getDate());
        this.form.startTime = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.endDate = today.getFullYear() + '-' + this.utils.toXX(today.getMonth() + 1) + '-' + this.utils.toXX(today.getDate());
        this.form.endTime = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
        this.form.withdrawDate = today.getFullYear() + '-' + this.utils.toXX(today.getMonth() + 1) + '-' + this.utils.toXX(today.getDate());
        this.form.withdrawTime = this.utils.toXX(today.getHours()) + ':' + this.utils.toXX(today.getMinutes());
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleReservationPage');
  }

  dupleCustomer() {
    if (this.form.isCustomerInfoSameAsReservationHolder) {
      this.form.customerName = this.form.reservationHolderName;
      this.form.customerPhone = this.form.reservationHolderPhone;
    }
  }
  send() {
    let confirm: any = this.alertCtrl.create({
      message: '저장하겠습니까?',
      buttons: [{
          text: '예',
          handler: async () => {
            await this.reservationProvider.addReservation(this.form);
            this.goToHome();
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
  sendEdit() {
    let confirm: any = this.alertCtrl.create({
      message: '예약을 수정하시겠습니까?',
      buttons: [{
          text: '예',
          handler: async () => {
            const obj = this.form;
            await this.connect.run({
              route: 'reservation',
              method: 'post'
            }, obj);
            this.goToHome();
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
  async goToHome() {
    await this.closePrev();
    const modal = this.ionicApp._modalPortal.getActive();
    if (modal) {
      modal.onWillDismiss(() => {
        this.events.publish('schedule:refresh');
      });
      modal.dismiss();
    } else {
      this.events.publish('schedule:refresh');
    }
  }
  async closePrev() {
    let prevC = async () => {
      const prev_modal = this.ionicApp._modalPortal.getPrevious();
      if (prev_modal) {
        await prev_modal.dismiss({}, '', {
          animate: false
        });
        return 'wait';
      } else {
        return 'done';
      }
    }
    let condition: string = 'wait';
    while (condition == 'wait') {
      condition = await prevC();
    }
    return "done";
  }
}