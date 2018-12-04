import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelListPage } from './cancel-list';

@NgModule({
  declarations: [
    CancelListPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelListPage),
  ],
})
export class CancelListPageModule {}
