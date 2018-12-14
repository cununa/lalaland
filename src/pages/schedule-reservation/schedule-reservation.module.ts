import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleReservationPage } from './schedule-reservation';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ScheduleReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleReservationPage),
    ComponentsModule
  ],
})
export class ScheduleReservationPageModule {}
