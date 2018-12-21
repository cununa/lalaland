import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: 'c-select-opts',
  segment: 'c-select-opts'
})
@Component({
  selector: 'page-c-select-opts',
  templateUrl: 'c-select-opts.html',
})
export class CSelectOptsPage {

  opts:any[];

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }
  ionViewDidLoad(){
    this.opts = this.navParams.data.options;
  }
  selectOpt(item) {
    this.viewCtrl.dismiss(item);
  }
}