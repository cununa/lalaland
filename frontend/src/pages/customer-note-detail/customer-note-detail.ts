import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController  } from 'ionic-angular';
/**
 * Generated class for the CustomerNoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : "customer-note-detail",
  segment : "customer-note-detail"
})
@Component({
  selector: 'page-customer-note-detail',
  templateUrl: 'customer-note-detail.html',
})
export class CustomerNoteDetailPage {
  item ={
    createdAt:'',
    name:'',
    title:'',
    content:''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
      this.item =this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerNoteDetailPage');
  }
}
