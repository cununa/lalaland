import { LoginPage } from './../pages/login/login';
import { CustomerProvider } from "./../providers/CustomerProvider";
import { NoteProvider } from "./../providers/NoteProvider";
import { Component, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Platform, App, IonicApp, Events, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Connect, User } from "../providers/cat/cat";
import { ReservationProvider } from "../providers/ReservationProvider";
@Component({
  selector: "app",
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "login";
  active = "schedule";
  userName = "";
  notesCount = 0;
  customersCount = 0;
  reservationsCount = 0;
  removedReservationsCount = 0;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    ionicApp: IonicApp,
    private events: Events,
    private connect: Connect,
    private menuCtrl: MenuController,
    private changeDetector: ChangeDetectorRef,
    private appCtrl: App,
    private user: User,
    private noteProvider: NoteProvider,
    private customerProvider: CustomerProvider,
    private reservationProvider: ReservationProvider
  ) {
    this.connect.url = 'https://lalaland-2019.appspot.com';//'http://localhost:8080'; 
    this.notesCount = this.noteProvider.notes.length;
    this.customersCount = this.customerProvider.customers.length;
    this.reservationsCount = this.reservationProvider.reservations.filter(
      reservation => reservation.isRemovedReservation === true
    ).length;
    this.removedReservationsCount = this.reservationProvider.reservations.filter(
      reservation => reservation.isRemovedReservation === false
    ).length;
    platform.ready().then( async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //history
      let popDelay: number = 0;
      window.addEventListener("popstate", function(ev) {
        //modal check - 모달을 히스토리백이나 네이티브 백으로 없앨 수 있게해주는 기능
        //modal call 전에 history
        if (!popDelay) {
          const alert = ionicApp._overlayPortal.getActive();
          if (alert) {
            history.pushState({}, "", location.href);
            alert.dismiss();
            return;
          }

          const modal = ionicApp._modalPortal.getActive();
          if (modal) {
            history.pushState({}, "", location.href);
            modal.dismiss();
            return;
          }
        } else {
          popDelay--;
        }
      });
      events.subscribe("app:overlayPop", () => {
        popDelay++;
      });
      events.subscribe("user:loggedIn", () => {
        console.log("this.user?", this.user);
        this.userName = this.user.name;
        this.notesCount = this.user.notesCount;
        this.reservationsCount = this.user.reservationsCount;
        this.customersCount = this.user.customersCount;
        this.removedReservationsCount = this.user.removedReservationsCount;
      });
      events.subscribe("note:noteChanged", () => {
        this.notesCount = this.noteProvider.notes.length;
      });
      events.subscribe("reservation:reservationAdded", reservationsCount => {
        this.reservationsCount = reservationsCount;
      });
      events.subscribe(
        "reservation:reservationRemoved",
        removedReservationsCount => {
          this.reservationsCount = this.reservationProvider.reservations.filter(
            reservation => reservation.isRemovedReservation === false
          ).length;
          this.removedReservationsCount = removedReservationsCount;
        }
      );
      events.subscribe("customer:customerAdded", customersCount => {
        this.customersCount = customersCount;
      });

      try {
        const result = await this.connect.run({route: 'check-auth', method: 'get'});
        if (result.error) {
          this.appCtrl.getRootNavs()[0].setRoot('login');
        } else {
          this.user.set(result);
          this.events.publish("user:loggedIn");
          if(location.href.indexOf('login') != -1) {
            this.appCtrl.getRootNavs()[0].setRoot('schedule');
          }
        }
      } catch (error) {
        console.error('error', error);
      }
    });
  }

  opened() {
    if (location.hash.indexOf("schedule") != -1) this.active = "schedule";
    else if (location.hash.indexOf("reservation-list") != -1)
      this.active = "reservation-list";
    else if (location.hash.indexOf("cancel-list") != -1)
      this.active = "cancel-list";
    else if (location.hash.indexOf("customer-list") != -1)
      this.active = "customer-list";
    else if (location.hash.indexOf("customer-note") != -1)
      this.active = "customer-note";
    else if (location.hash.indexOf("rental-space") != -1)
      this.active = "rental-space";
    else if (location.hash.indexOf("rental-rate") != -1)
      this.active = "rental-rate";
    else if (location.hash.indexOf("admin") != -1) this.active = "admin";
    this.changeDetector.detectChanges();
  }
  navPush(nm) {
    this.active = nm;
    this.appCtrl.getRootNavs()[0].setRoot(nm);
    setTimeout(() => {
      this.menuCtrl.close();
    }, 300);
  }

  logout() {
    this.user.clear();
    this.navPush("login");
  }
}
