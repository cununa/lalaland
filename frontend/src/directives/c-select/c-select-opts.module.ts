import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CSelectOptsPage } from './c-select-opts';

@NgModule({
  declarations: [
    CSelectOptsPage,
  ],
  imports: [
    IonicPageModule.forChild(CSelectOptsPage),
  ],
})
export class CSelectPageModule {}