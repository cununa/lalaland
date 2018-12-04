import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerNotePage } from './customer-note';

@NgModule({
  declarations: [
    CustomerNotePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerNotePage),
  ],
})
export class CustomerNotePageModule {}
