import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[longClick]',
  host: {
    '(touchstart)': 'startClick($event)',
    '(touchend)': 'cancelClick($event)',
    '(touchcancel)': 'cancelClick($event)'
  }
})
export class CLongclickDirective {

  @Output() longClick = new EventEmitter();

  click_timeout = null;

  constructor() {
    console.log('Hello CLongclickDirective Directive');
  }

  startClick(ev) {
    clearTimeout(this.click_timeout);
    this.click_timeout = setTimeout(() => {
      this.longClick.emit();
    }, 400);
  }
  cancelClick() {
    clearTimeout(this.click_timeout);
  }

}
