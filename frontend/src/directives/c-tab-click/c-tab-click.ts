import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[tab-click]' // Attribute selector
})
export class CTabClickDirective {

  @Input('tab-click') mytabs:any;
  @Output() 'tabClick' = new EventEmitter();

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) {
    console.log('Hello CTabClickDirective Directive');
  }
  ngOnInit() {
    setTimeout(() => {
      this.initClickEvent();
    }, 0);
  }
  initClickEvent() {
    let j = this.getEl(this.mytabs._elementRef.nativeElement, this.el.nativeElement);
    const el_mytabs = this.mytabs.getNativeElement();
    const el_tabs = el_mytabs.children[0];
    const el_tab1 = el_mytabs.children[0].children[j];
    const el_tab2 = el_mytabs.children[0].children[j+1];
    const el_tab1_cover = this.renderer2.createElement('div');
    const el_tab1_block = this.renderer2.createElement('div');
    this.renderer2.setStyle(el_tab1_cover, 'position', 'relative');
    this.renderer2.setStyle(el_tab1_cover, 'flex', '1');
    this.renderer2.setStyle(el_tab1_block, 'position', 'absolute');
    this.renderer2.setStyle(el_tab1_block, 'top', '0');
    this.renderer2.setStyle(el_tab1_block, 'left', '0');
    this.renderer2.setStyle(el_tab1_block, 'height', '100%');
    this.renderer2.setStyle(el_tab1_block, 'width', '100%');
    this.renderer2.appendChild(el_tab1_cover, el_tab1);
    this.renderer2.appendChild(el_tab1_cover, el_tab1_block);
    this.renderer2.insertBefore(el_tabs, el_tab1_cover, el_tab2);
    this.renderer2.listen(el_tab1_cover, 'click', () => {
      this.tabClick.emit();
    });
  }
  getEl(tabs, el) {
    let j = 0;
    for(let i = 0; i < tabs.children.length; i++) {
      if(tabs.children[i].tagName == 'ION-TAB') {
        if(tabs.children[i] == el) {
          return j;
        }
        j++;
      }
    }
  }
  getNextElement(el) {
    let nextSibling = el.nextSibling;
    while(nextSibling && nextSibling.nodeType != 1) {
      nextSibling = nextSibling.nextSibling;
    }
    return nextSibling;
  }
}
