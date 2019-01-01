import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import axios from 'axios';
import moment from 'moment';
import { ModalCtrl, User, Connect } from '../../providers/cat/cat'; // 인증(로그인) 처리를 위해선 User를 넣어주어야 함
import { NoteProvider } from '../../providers/NoteProvider';
import { TitleCasePipe } from '@angular/common';

/**
 * Generated class for the CustomerNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface INote {
  _id: string,
  title: string,
  content: string,
  createdAt: string,
}
@IonicPage({
  name: 'customer-note',
  segment: 'customer-note'
})
@Component({
  selector: 'page-customer-note',
  templateUrl: 'customer-note.html',
})
export class CustomerNotePage {
  notes: INote[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalCtrl,//모달 컨트롤러 아니고 모달 콘트롤쓴다 
    public menuCtrl: MenuController,
    public user: User,
    private connect: Connect,
    public events: Events,
    public note: NoteProvider
  ) {
    this.notes= this.note.notes;
    this.events.subscribe('note:noteChanged', () => {
      this.notes = this.note.notes
    })
  }

  ionViewDidLoad() {
    // 로그인 되어있는지 여부를 판단하고 되어있지 않으면 login 페이지로 보냄
    console.log(this.user.get());
    if (!this.user.get().token) {
      this.navCtrl.setRoot('login', {} , {animate: true});
    } else {
      this.getList()
    }
    // ----------------------------------------------------------------
  }

  ionViewDidEnter() {
    this.notes= this.note.notes;
  }

  ionViewWillEnter() {
    this.notes= this.note.notes;
  }
  
  openModalWrite(){
    let modal = this.modalCtrl.createWithCallBack(
      'popup-customer', { method: "createNote"}, { cssClass: 'long-modal'}, this.newNoteCreated.bind(this)).present();
  }

  async getList() {
    const result = await this.connect.run({route: 'note', method: 'get'});
    if (result.error) {
      return;
    }
    this.note.initNotesFromServer(result);
  }

  newNoteCreated(newNote: INote) {
    if (typeof newNote === "undefined") {
      return;
    }
    this.note.addNote(newNote)
  }


}