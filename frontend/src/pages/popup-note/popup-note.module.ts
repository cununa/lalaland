import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupNotePage } from './popup-note';

@NgModule({
  declarations: [
    PopupNotePage,
  ],
  imports: [
    IonicPageModule.forChild(PopupNotePage),
  ],
})
export class PopupNotePageModule {}
