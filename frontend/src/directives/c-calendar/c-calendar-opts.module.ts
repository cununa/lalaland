import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CCalendarOptsPage } from './c-calendar-opts';

@NgModule({
  declarations: [
    CCalendarOptsPage,
  ],
  imports: [
    IonicPageModule.forChild(CCalendarOptsPage),
  ],
})
export class CCalendarPageModule {}