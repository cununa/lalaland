import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerNotePage } from './customer-note';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    CustomerNotePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerNotePage),
    ComponentsModule
  ],
})
export class CustomerNotePageModule {}
