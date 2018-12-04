import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleReservationPage } from './schedule-reservation';

@NgModule({
  declarations: [
    ScheduleReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleReservationPage),
  ],
})
export class ScheduleReservationPageModule {}
