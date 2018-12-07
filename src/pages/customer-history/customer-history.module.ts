import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerHistoryPage } from './customer-history';

@NgModule({
  declarations: [
    CustomerHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerHistoryPage),
  ],
})
export class CustomerHistoryPageModule {}
