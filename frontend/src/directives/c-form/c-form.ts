import { Directive } from '@angular/core';

@Directive({
  selector: 'form',
  host: {
    '(keypress)': 'disableEnter($event)',
    '(keyup)': 'disableEnter($event)'
  }
})
export class CFormDirective {

  constructor(

  ) {
    console.log('Hello CFormDirective Directive');
  }
  disableEnter(ev) {
    if(ev.keyCode == 13) {
      ev.preventDefault();
    }
  }
}
