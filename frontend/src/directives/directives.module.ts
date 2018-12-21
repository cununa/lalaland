import {
  NgModule
} from '@angular/core';
import {
  CSelectDirective
} from './c-select/c-select';
import {
  CCalendarDirective
} from './c-calendar/c-calendar';
import {
  CEnterDirective
} from './c-enter/c-enter';
import {
  CModelDirective
} from './c-model/c-model';
import {
  CTabClickDirective
} from './c-tab-click/c-tab-click';
import {
  CSwipeBackDirective
} from './c-swipe-back/c-swipe-back';
import { CImgErrDirective } from './c-img-err/c-img-err';
import { ScrollLimitDirective } from './scroll-limit/scroll-limit';
import { CFormDirective } from './c-form/c-form';
import { CLongclickDirective } from './c-longclick/c-longclick';
import { CNavDirective } from './c-nav/c-nav';
@NgModule({
  declarations: [
    CSelectDirective,
    CCalendarDirective,
    CEnterDirective,
    CModelDirective,
    CTabClickDirective,
    CSwipeBackDirective,
    CImgErrDirective,
    ScrollLimitDirective,
    CFormDirective,
    CLongclickDirective,
    CNavDirective
  ],
  imports: [],
  exports: [
    CSelectDirective,
    CCalendarDirective,
    CEnterDirective,
    CModelDirective,
    CTabClickDirective,
    CSwipeBackDirective,
    CImgErrDirective,
    ScrollLimitDirective,
    CFormDirective,
    CLongclickDirective,
    CNavDirective
  ]
})
export class DirectivesModule {}