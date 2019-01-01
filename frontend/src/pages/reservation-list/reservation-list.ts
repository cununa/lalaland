import { IReservation } from "./../../providers/ReservationProvider";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Events
} from "ionic-angular";
import { ReservationProvider } from "../../providers/ReservationProvider";

/**
 * Generated class for the ReservationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "reservation-list",
  segment: "reservation-list"
})
@Component({
  selector: "page-reservation-list",
  templateUrl: "reservation-list.html"
})
export class ReservationListPage {
  reservations: IReservation[] = [];

  event_1 = null;

  constructor(
    private events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private reservationProvider: ReservationProvider
  ) {
  }

  async ionViewDidLoad() {
    this.event_1 = this.getList.bind(this);
    this.events.subscribe('reservation:reservationRemoved', this.event_1);
    await this.reservationProvider.getReservations();
    this.reservations = this.reservationProvider.reservations;
  }
  ionViewWillUnload(){
    this.events.unsubscribe('reservation:reservationRemoved', this.event_1);
  }
  getList() {
    this.reservations = this.reservationProvider.reservations;
  }
}