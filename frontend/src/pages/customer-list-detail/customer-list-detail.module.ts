import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerListDetailPage } from './customer-list-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CustomerListDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerListDetailPage),
    ComponentsModule
  ],
})
export class CustomerListDetailPageModule {}
