import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupCustomerPage } from './popup-customer';

@NgModule({
  declarations: [
    PopupCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupCustomerPage),
  ],
})
export class PopupCustomerPageModule {}
