import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerHistoryPage } from './customer-history';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CustomerHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerHistoryPage),
    ComponentsModule
  ],
})
export class CustomerHistoryPageModule {}
