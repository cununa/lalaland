import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleDetailPage } from './schedule-detail';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ScheduleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleDetailPage),
    ComponentsModule
  ],
})
export class ScheduleDetailPageModule {}
