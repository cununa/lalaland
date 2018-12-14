import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalSpacePage } from './rental-space';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    RentalSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(RentalSpacePage),
    ComponentsModule
  ],
})
export class RentalSpacePageModule {}
