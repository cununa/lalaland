import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController, ActionSheetController, Events  } from 'ionic-angular';
import { IReservation, ReservationProvider } from '../../providers/ReservationProvider';
import { ModalCtrl } from '../../providers/cat/cat';

/**
 * Generated class for the ScheduleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "schedule-detail",
  segment : "schedule-detail"
})
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {
  reservation: IReservation = {
    _id: '',
    title: '',
    content: '',
    reservationHolderName: '',
    reservationHolderPhone: '',
    isCustomerInfoSameAsReservationHolder: false,
    space: '',
    company: '',
    customerId: '',
    customerName: '',
    customerPhone: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    withdrawDate: '',
    withdrawTime: '',
    isRemovedReservation: false,
    downPayment: false,
    intermediatePayment: false,
    finalPayment: false
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public menuCtrl: MenuController,
    private reservationProvider: ReservationProvider,
    private modalCtrl: ModalCtrl,
    private events: Events
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleDetailPage');
    this.reservation = this.navParams.data
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '입금 확인',
      buttons: [{
          text: '선금 입금',
          role: 'downPayment',//임시로 이름 지었습니다
          handler: async () => {
            console.log('downPayment 선금 clicked');
            const phases = {
              reservationId: this.reservation._id,
              downPayment: true,
              intermediatePayment: this.reservation.intermediatePayment,
              finalPayment: this.reservation.finalPayment
            }
            const result = await this.reservationProvider.updatePaymentPhase(phases);
            this.reservation.downPayment = result.downPayment;
            this.reservation.intermediatePayment = result.intermediatePayment;
            this.reservation.finalPayment = result.finalPayment;
            this.events.publish('schedule:refresh');
          }
        },
        {
          text: '중도금 입금',
          role: 'intermediatePayment',//임시로 이름 지었습니다
          handler: async () => {
            console.log('intermediatePayment 중도금 clicked');
            const phases = {
              reservationId: this.reservation._id,
              downPayment: this.reservation.downPayment,
              intermediatePayment: true,
              finalPayment: this.reservation.finalPayment
            }
            const result = await this.reservationProvider.updatePaymentPhase(phases);
            this.reservation.downPayment = result.downPayment;
            this.reservation.intermediatePayment = result.intermediatePayment;
            this.reservation.finalPayment = result.finalPayment;
            this.events.publish('schedule:refresh');
          }
        },
        {
          text: '잔금 입금',
          role: 'finalPayment',//임시로 이름 지었습니다
          handler: async () => {
            console.log('finalPayment 잔금 clicked');
            const phases = {
              reservationId: this.reservation._id,
              downPayment: this.reservation.downPayment,
              intermediatePayment: this.reservation.intermediatePayment,
              finalPayment: true
            }
            const result = await this.reservationProvider.updatePaymentPhase(phases);
            this.reservation.downPayment = result.downPayment;
            this.reservation.intermediatePayment = result.intermediatePayment;
            this.reservation.finalPayment = result.finalPayment;
            this.events.publish('schedule:refresh');
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

    actionSheet.present();
  }

  editSchedule() {
    this.modalCtrl.create('schedule-reservation', {
      reservation: this.reservation
    }).present();
  }

  async removeSchedule() {
    this.reservationProvider.removeReservation(this.reservation._id);
    this.navCtrl.pop();
  }

  async removeRemovedSchedule() {
    this.reservationProvider.removeRemovedReservation(this.reservation._id);
    this.navCtrl.pop();
  }
}
