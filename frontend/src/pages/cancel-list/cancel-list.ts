import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Events
} from "ionic-angular";
import {
  IReservation,
  ReservationProvider
} from "../../providers/ReservationProvider";

/**
 * Generated class for the CancelListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "cancel-list",
  segment: "cancel-list"
})
@Component({
  selector: "page-cancel-list",
  templateUrl: "cancel-list.html"
})
export class CancelListPage {
  reservations: IReservation[] = [];

  constructor(
    private events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private reservationProvider: ReservationProvider
  ) {
    this.events.subscribe('reservation:reservationRemoved', () => {
      console.log("CancelListPage")
      this.reservations = this.reservationProvider.reservations
    })

  }

  async ionViewDidLoad() {
    console.log("ionViewDidLoad CancelListPage");
    await this.reservationProvider.getReservations();
    this.reservations = this.reservationProvider.reservations;
  }
}
