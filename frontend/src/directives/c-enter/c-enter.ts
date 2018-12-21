import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[enter]', // Attribute selector
  host: {
    '(keyup)': 'pushKey($event)'
  }
})
export class CEnterDirective {

  is_entering:boolean = false;

  @Output() 'enter' = new EventEmitter();

  constructor() {
    console.log('Hello CEnterDirective Directive');
  }
  pushKey(ev) {
    if(!this.is_entering && ev.keyCode == 13) {
      this.is_entering = true;
      this['enter'].emit();
      setTimeout(() => {
        this.is_entering = false;
      }, 200);
    }
  }
}
