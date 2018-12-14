import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleListPage } from './schedule-list';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ScheduleListPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleListPage),
    ComponentsModule 
  ],
})
export class ScheduleListPageModule {}
