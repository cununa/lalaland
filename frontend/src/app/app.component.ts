import { Component,ChangeDetectorRef } from '@angular/core';
import { Platform, App, IonicApp, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'schedule';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    ionicApp: IonicApp,
    events: Events,
    private changeDetector: ChangeDetectorRef,
    private appCtrl: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //history
      let popDelay:number = 0;
      window.addEventListener('popstate', function (ev) {
        //modal check - 모달을 히스토리백이나 네이티브 백으로 없앨 수 있게해주는 기능
        //modal call 전에 history
        if (!popDelay) {
          const alert = ionicApp._overlayPortal.getActive();
          if (alert) {
            history.pushState({}, '', location.href);
            alert.dismiss();
            return;
          }

          const modal = ionicApp._modalPortal.getActive();
          if (modal) {
            history.pushState({}, '', location.href);
            modal.dismiss();
            return;
          }
        } else {
          popDelay--;
        }
      });
      events.subscribe('app:overlayPop', () => {
        popDelay++;
      });

    });
  }
  opened() {
    if(location.hash.indexOf('schedule') != -1) this.active = 'schedule';
    else if(location.hash.indexOf('reservation-list') != -1) this.active = 'reservation-list';
    else if(location.hash.indexOf('cancel-list') != -1) this.active = 'cancel-list';
    else if(location.hash.indexOf('customer-list') != -1) this.active = 'customer-list';
    else if(location.hash.indexOf('customer-note') != -1) this.active = 'customer-note';
    else if(location.hash.indexOf('rental-space') != -1) this.active = 'rental-space';
    else if(location.hash.indexOf('rental-rate') != -1) this.active = 'rental-rate';
    else if(location.hash.indexOf('admin') != -1) this.active = 'admin';
    this.changeDetector.detectChanges();
  }
  navPush(nm){
    this.appCtrl.getRootNavs()[0].setRoot(nm);
  }
}

