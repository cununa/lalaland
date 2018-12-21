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
  selector: '[type=select]',
  host: {
    '(click)': 'showOptions()',
    '(keyup)': 'triggerShow($event)'
  }
})
export class CSelectDirective {

  @Input('opts') opts: Array < any > ;
  @Input('opts-value') opts_value: string = 'value';
  @Input('opts-text') opts_text: string = 'text';
  @Input('selected') value: any = '';

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
    if (this.opts) {
      for (let i = 0; i < this.opts.length; i++) {
        if (this.opts[i][this.opts_value] == this.value) {
          this.elRef.nativeElement.value = this.opts[i][this.opts_text];
          break;
        }
      }
    }
  }
  showOptions() {
    if (this.opts) {
      let opts = [];
      for (let i = 0; i < this.opts.length; i++) {
        opts.push({
          value: this.opts[i][this.opts_value],
          text: this.opts[i][this.opts_text]
        });
      }
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
      let pop = this.popCtrl.create('c-select-opts', {
        options: opts
      }, {
        cssClass: need_fix
      });
      pop.present({
        ev: {
          target: this.elRef.nativeElement
        }
      });
      pop.onWillDismiss(item => {
        if (item) {
          this.selectedChange.emit(item.value);
          this.change.emit(item);
          setTimeout(() => {
            this.elRef.nativeElement.value = item.text;
          }, 0);
        }
      });
    }
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