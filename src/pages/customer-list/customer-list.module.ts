import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerListPage } from './customer-list';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    CustomerListPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerListPage),
    ComponentsModule
  ],
})
export class CustomerListPageModule {}
