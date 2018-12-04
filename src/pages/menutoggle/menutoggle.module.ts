import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenutogglePage } from './menutoggle';

@NgModule({
  declarations: [
    MenutogglePage,
  ],
  imports: [
    IonicPageModule.forChild(MenutogglePage),
  ],
})
export class MenutogglePageModule {}
