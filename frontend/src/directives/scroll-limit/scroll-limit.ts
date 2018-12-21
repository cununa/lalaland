import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[scrollLimit]'
})
export class ScrollLimitDirective {

  @Input('scroll-direction') scroll_direction = 'y';
  @Output('scrollLimit') scrollLimit = new EventEmitter();

  is_over:boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }
  ngOnInit() {
    const scrollEl = this.el.nativeElement.tagName === 'ION-CONTENT' ? this.el.nativeElement.children[1] : this.el.nativeElement;
    this.renderer.listen(scrollEl, 'scroll', () => {
      let condition = false;
      if(this.scroll_direction === 'y') {
        condition = scrollEl.scrollTop + scrollEl.offsetHeight + 50 > scrollEl.scrollHeight;
      } else {
        condition = scrollEl.scrollLeft + scrollEl.offsetWidth + 50 > scrollEl.scrollWidth;
      }
      if(condition) {
        if(this.is_over == false) {
          this.is_over = true;
          this.scrollLimit.emit();
        }
      } else {
        this.is_over = false;
      }
    });
  }
}