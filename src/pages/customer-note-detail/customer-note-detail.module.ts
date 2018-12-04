import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerNoteDetailPage } from './customer-note-detail';

@NgModule({
  declarations: [
    CustomerNoteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerNoteDetailPage),
  ],
})
export class CustomerNoteDetailPageModule {}
