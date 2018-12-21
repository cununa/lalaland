import {
  Directive,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
import {
  PopoverController
} from 'ionic-angular';

@Directive({
  selector: '[type=calendar]',
  host: {
    '(click)': 'showOptions()',
    '(keyup)': 'triggerShow($event)'
  }
})
export class CCalendarDirective {

  @Input('format') format = 'XXXX년 MM월 DD일';
  @Input('selected') value: any = '';
  @Input('min') min: string = '';
  @Input('max') max: string = '';

  @Output() selectedChange = new EventEmitter();
  @Output() change = new EventEmitter();

  popup = null;

  constructor(
    private elRef: ElementRef,
    private popCtrl: PopoverController,
    private renderer: Renderer2
  ) {

  }
  ngOnChanges() {
    this.elRef.nativeElement.value = this.showText(this.value);
  }
  showText(item) {
    if(item) {
      return item.substring(0, 4) + '년 ' + item.substring(5, 7) + '월 ' + item.substring(8, 10) + '일';
    } else {
      return null;
    }
  }
  showOptions() {
    let rect = this.elRef.nativeElement.getBoundingClientRect();
    let need_fix: string = '';
    let overflow_x_px = window.innerWidth - (rect.left + rect.width);
    let overflow_x_width = window.innerWidth - rect.left;
    let overflow_y_px = window.innerHeight - (rect.top + rect.height);
    let overflow_y_persent = rect.top / window.innerHeight;
    if (overflow_x_width < 250) {
      if (overflow_y_persent >= 0.5) {
        need_fix = 'popover-fix-right-bottom';
      } else {
        need_fix = 'popover-fix-right';
      }
    } else {
      if (overflow_y_persent >= 0.5) {
        need_fix = 'popover-fix-bottom';
      } else {
        need_fix = '';
      }
    }
    setTimeout(() => {
      let pop_arr = document.getElementsByClassName('popover-content');
      let el = pop_arr[pop_arr.length - 1];
      if (overflow_x_width < 250) {
        this.renderer.setStyle(el, 'left', 'auto');
        this.renderer.setStyle(el, 'right', overflow_x_px + 'px');
      }
      if (overflow_y_persent >= 0.5) {
        this.renderer.setStyle(el, 'top', 'auto');
        this.renderer.setStyle(el, 'bottom', overflow_y_px + 'px');
      }
    }, 10);
    let target = {
      target: this.elRef.nativeElement
    };
    let pop = this.popCtrl.create('c-calendar-opts', {
      selected: this.value,
      min: this.min,
      max: this.max
    }, {
      cssClass: need_fix
    });
    pop.present({
      ev: target
    });
    pop.onWillDismiss(item => {
      if (item) {
        this.selectedChange.emit(item);
        this.change.emit(item);
        setTimeout(() => {
          this.elRef.nativeElement.value = this.showText(item);
        }, 0);
      }
    });
  }
  triggerShow(ev) {
    if (ev.keyCode == 13) {
      this.showOptions();
    }
  }
}
export interface Selected {
  value: any,
    text: string
}