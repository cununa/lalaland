import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerNoteDetailPage } from './customer-note-detail';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    CustomerNoteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerNoteDetailPage),
    ComponentsModule
  ],
})
export class CustomerNoteDetailPageModule {}
