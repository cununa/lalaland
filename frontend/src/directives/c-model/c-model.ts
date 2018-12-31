import { Directive, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[ngModel]', // Attribute selector
  host: {
    '(input)': 'connectNg($event)'
  }
})
export class CModelDirective {

  @Input('filter') filter:string = '';

  constructor(
    private model: NgModel
  ) {
    console.log('Hello CModelDirective Directive');
  }
  connectNg(ev) {
    switch(this.filter) {
      case 'number':
      ev.target.value = ev.target.value.replace(/[^0-9]/g, '');
      break;
    }
    //this.model.viewToModelUpdate(ev.target.value);
    this.model.reset(ev.target.value);
  }
}