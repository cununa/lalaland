import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationListPage } from './reservation-list';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ReservationListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationListPage),
    ComponentsModule
  ],
})
export class ReservationListPageModule {}
