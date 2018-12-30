import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController, ActionSheetController  } from 'ionic-angular';
import { IReservation } from '../../providers/ReservationProvider';

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
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleDetailPage');
    this.reservation = this.navParams.data
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '입금 상태 확인',
      buttons: [{
          text: '계약금 입금완료',
          role: 'paymentStart',//임시로 이름 지었습니다
          handler: () => {
            console.log('paymentStart clicked');
          }
        },
        {
          text: '중도금 입금완료',
          role: 'paymentPart',//임시로 이름 지었습니다
          handler: () => {
            console.log('paymentPart clicked');
          }
        },
        {
          text: '최종 입금완료',
          role: 'paymentEnd or Last',//임시로 이름 지었습니다
          handler: () => {
            console.log('paymentEnd clicked');
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

}
