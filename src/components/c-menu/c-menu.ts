import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'menu',
  templateUrl: 'c-menu.html'
})
export class CMenuComponent {

  @Input('id') id;
  @Input('content') content;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }
  navPush(nm){
    this.navCtrl.push(nm);
  }
}
