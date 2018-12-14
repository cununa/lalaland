import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalRatePage } from './rental-rate';
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    RentalRatePage,
  ],
  imports: [
    IonicPageModule.forChild(RentalRatePage),
    ComponentsModule
  ],
})
export class RentalRatePageModule {}
