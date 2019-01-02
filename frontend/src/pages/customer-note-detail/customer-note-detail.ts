import { NoteProvider } from './../../providers/NoteProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events  } from 'ionic-angular';
import { ModalCtrl, User, Connect, Utils } from '../../providers/cat/cat';
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
  list: Array<string>;
  userName: ''
  item = {
    _id: '',
    createdAt:'',
    name:'',
    title:'',
    content:''
  }

  constructor(
    public utils: Utils,
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalCtrl,//모달 컨트롤러 아니고 모달 콘트롤쓴다
    public menuCtrl: MenuController,
    public user: User,
    public connect: Connect,
    public events: Events,
    public note: NoteProvider
  ) {
    this.userName = this.user.name;
    this.item = this.navParams.data;
  }

  ionViewDidLoad() {
    
  }

  openUpdateNoteModal(){
    let modal = this.modalCtrl.createWithCallBack(
      'popup-note', { noteId: this.item._id, method: 'updateNote', data: this.item}, { cssClass: 'long-modal'}, this.updateNote.bind(this)).present();
  }

  async removeNote() {
    const result = await this.connect.run({route: `note/${this.item._id}`, method: 'delete'})
    if (result.n === 1 && result.ok === 1) {
      this.note.removeNote(this.item._id);
    } else {
      console.log("Note 삭제하는데 실패.")
    }
    this.navCtrl.pop();
  }

  async updateNote(updatedNote) {
    if(updatedNote) {
      this.item = updatedNote;
      this.note.updateNote(updatedNote);
    }
  }

}
