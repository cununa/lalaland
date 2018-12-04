import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalSpacePage } from './rental-space';

@NgModule({
  declarations: [
    RentalSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(RentalSpacePage),
  ],
})
export class RentalSpacePageModule {}
