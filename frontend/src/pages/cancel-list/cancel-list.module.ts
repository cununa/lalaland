import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelListPage } from './cancel-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CancelListPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelListPage),
    ComponentsModule
  ],
})
export class CancelListPageModule {}
