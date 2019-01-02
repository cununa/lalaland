import {
  Directive,
  Input
} from '@angular/core';
import {
  IonicApp,
  Events
} from 'ionic-angular';
import {
  ModalCtrl,
  User
} from '../../providers/cat/cat';

@Directive({
  selector: '[nav]',
  host: {
    '(click)': 'navPage()'
  }
})
export class CNavDirective {

  @Input('nav') nav: string = '';

  constructor(
    private modalCtrl: ModalCtrl,
    public user: User,
    private ionicApp: IonicApp,
    private events: Events
  ) {

  }
  navPage() {
    switch (this.nav) {
      case 'home':
        this.goToHome();
        break;
      case 'search':
        this.openSearch();
        break;
      case 'user-cart':
        this.openUserCart();
        break;
    }
  }
  async goToHome() {
    await this.closePrev();
    const modal = this.ionicApp._modalPortal.getActive();
    if (modal) {
      modal.onWillDismiss(() => {
        this.events.publish('schedule:refresh()');
      });
      modal.dismiss();
    } else {
      this.events.publish('schedule:refresh()');
    }
  }
  openSearch() {
    this.modalCtrl.create('search').present();
  }
  openUserCart() {
    this.events.publish('home:openUserCart()');
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